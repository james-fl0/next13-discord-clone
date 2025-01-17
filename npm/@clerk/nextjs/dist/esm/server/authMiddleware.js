import { buildRequestUrl, constants } from "@clerk/backend";
import { NextResponse } from "next/server";
import { isRedirect, mergeResponses, paths, setHeader, stringifyHeaders } from "../utils";
import { withLogger } from "../utils/debugLogger";
import { authenticateRequest, handleInterstitialState, handleUnknownState } from "./authenticateRequest";
import { SECRET_KEY } from "./clerkClient";
import { DEV_BROWSER_JWT_MARKER, setDevBrowserJWTInURL } from "./devBrowser";
import { infiniteRedirectLoopDetected, informAboutProtectedRouteInfo, receivedRequestForIgnoredRoute } from "./errors";
import { redirectToSignIn } from "./redirect";
import {
  apiEndpointUnauthorizedNextResponse,
  decorateRequest,
  isCrossOrigin,
  isDevelopmentFromApiKey,
  setRequestHeadersOnNextResponse
} from "./utils";
const INFINITE_REDIRECTION_LOOP_COOKIE = "__clerk_redirection_loop";
const DEFAULT_CONFIG_MATCHER = ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"];
const DEFAULT_IGNORED_ROUTES = ["/((?!api|trpc))(_next|.+\\..+)(.*)"];
const DEFAULT_API_ROUTES = ["/api/(.*)", "/trpc/(.*)"];
const authMiddleware = (...args) => {
  const [params = {}] = args;
  const { beforeAuth, afterAuth, publicRoutes, ignoredRoutes, apiRoutes, ...options } = params;
  const isIgnoredRoute = createRouteMatcher(ignoredRoutes || DEFAULT_IGNORED_ROUTES);
  const isPublicRoute = createRouteMatcher(withDefaultPublicRoutes(publicRoutes));
  const isApiRoute = createApiRoutes(apiRoutes);
  const defaultAfterAuth = createDefaultAfterAuth(isPublicRoute, isApiRoute, params);
  return withLogger("authMiddleware", (logger) => async (_req, evt) => {
    if (options.debug) {
      logger.enable();
    }
    const req = withNormalizedClerkUrl(_req);
    logger.debug("URL debug", {
      url: req.nextUrl.href,
      method: req.method,
      headers: stringifyHeaders(req.headers),
      nextUrl: req.nextUrl.href,
      clerkUrl: req.experimental_clerkUrl.href
    });
    logger.debug("Options debug", { ...options, beforeAuth: !!beforeAuth, afterAuth: !!afterAuth });
    if (isIgnoredRoute(req)) {
      logger.debug({ isIgnoredRoute: true });
      if (isDevelopmentFromApiKey(options.secretKey || SECRET_KEY) && !params.ignoredRoutes) {
        console.warn(
          receivedRequestForIgnoredRoute(req.experimental_clerkUrl.href, JSON.stringify(DEFAULT_CONFIG_MATCHER))
        );
      }
      return setHeader(NextResponse.next(), constants.Headers.AuthReason, "ignored-route");
    }
    const beforeAuthRes = await (beforeAuth && beforeAuth(req, evt));
    if (beforeAuthRes === false) {
      logger.debug("Before auth returned false, skipping");
      return setHeader(NextResponse.next(), constants.Headers.AuthReason, "skip");
    } else if (beforeAuthRes && isRedirect(beforeAuthRes)) {
      logger.debug("Before auth returned redirect, following redirect");
      return setHeader(beforeAuthRes, constants.Headers.AuthReason, "redirect");
    }
    const requestState = await authenticateRequest(req, options);
    if (requestState.isUnknown) {
      logger.debug("authenticateRequest state is unknown", requestState);
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial && isApiRoute(req)) {
      logger.debug("authenticateRequest state is interstitial in an API route", requestState);
      return handleUnknownState(requestState);
    } else if (requestState.isInterstitial) {
      logger.debug("authenticateRequest state is interstitial", requestState);
      const res = handleInterstitialState(requestState, options);
      return assertInfiniteRedirectionLoop(req, res, options);
    }
    const auth = Object.assign(requestState.toAuth(), {
      isPublicRoute: isPublicRoute(req),
      isApiRoute: isApiRoute(req)
    });
    logger.debug(() => ({ auth: JSON.stringify(auth), debug: auth.debug() }));
    const afterAuthRes = await (afterAuth || defaultAfterAuth)(auth, req, evt);
    const finalRes = mergeResponses(beforeAuthRes, afterAuthRes) || NextResponse.next();
    logger.debug(() => ({ mergedHeaders: stringifyHeaders(finalRes.headers) }));
    if (isRedirect(finalRes)) {
      logger.debug("Final response is redirect, following redirect");
      const res = setHeader(finalRes, constants.Headers.AuthReason, "redirect");
      return appendDevBrowserOnCrossOrigin(req, res, options);
    }
    if (options.debug) {
      setRequestHeadersOnNextResponse(finalRes, req, { [constants.Headers.EnableDebug]: "true" });
      logger.debug(`Added ${constants.Headers.EnableDebug} on request`);
    }
    return decorateRequest(req, finalRes, requestState);
  });
};
const createRouteMatcher = (routes) => {
  if (typeof routes === "function") {
    return (req) => routes(req);
  }
  const routePatterns = [routes || ""].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req) => matchers.some((matcher) => matcher.test(req.nextUrl.pathname));
};
const createDefaultAfterAuth = (isPublicRoute, isApiRoute, params) => {
  return (auth, req) => {
    if (!auth.userId && !isPublicRoute(req)) {
      informAboutProtectedRoute(req.experimental_clerkUrl.pathname, params);
      if (isApiRoute(req)) {
        return apiEndpointUnauthorizedNextResponse();
      }
      return redirectToSignIn({ returnBackUrl: req.experimental_clerkUrl.href });
    }
    return NextResponse.next();
  };
};
const precomputePathRegex = (patterns) => {
  return patterns.map((pattern) => pattern instanceof RegExp ? pattern : paths.toRegexp(pattern));
};
const matchRoutesStartingWith = (path) => {
  path = path.replace(/\/$/, "");
  return new RegExp(`^${path}(/.*)?$`);
};
const withDefaultPublicRoutes = (publicRoutes) => {
  if (typeof publicRoutes === "function") {
    return publicRoutes;
  }
  const routes = [publicRoutes || ""].flat().filter(Boolean);
  const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
  if (signInUrl) {
    routes.push(matchRoutesStartingWith(signInUrl));
  }
  const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
  if (signUpUrl) {
    routes.push(matchRoutesStartingWith(signUpUrl));
  }
  return routes;
};
const appendDevBrowserOnCrossOrigin = (req, res, opts) => {
  const location = res.headers.get("location");
  const shouldAppendDevBrowser = res.headers.get(constants.Headers.ClerkRedirectTo) === "true";
  if (shouldAppendDevBrowser && !!location && isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY) && isCrossOrigin(req.experimental_clerkUrl, location)) {
    const dbJwt = req.cookies.get(DEV_BROWSER_JWT_MARKER)?.value;
    const urlWithDevBrowser = setDevBrowserJWTInURL(location, dbJwt);
    return NextResponse.redirect(urlWithDevBrowser, res);
  }
  return res;
};
const createApiRoutes = (apiRoutes) => {
  if (apiRoutes) {
    return createRouteMatcher(apiRoutes);
  }
  const isDefaultApiRoute = createRouteMatcher(DEFAULT_API_ROUTES);
  return (req) => isDefaultApiRoute(req) || isRequestMethodIndicatingApiRoute(req) || isRequestContentTypeJson(req);
};
const isRequestContentTypeJson = (req) => {
  const requestContentType = req.headers.get(constants.Headers.ContentType);
  return requestContentType === constants.ContentTypes.Json;
};
const isRequestMethodIndicatingApiRoute = (req) => {
  const requestMethod = req.method.toLowerCase();
  return !["get", "head", "options"].includes(requestMethod);
};
const assertInfiniteRedirectionLoop = (req, res, opts) => {
  if (!isDevelopmentFromApiKey(opts.secretKey || SECRET_KEY)) {
    return res;
  }
  const infiniteRedirectsCounter = Number(req.cookies.get(INFINITE_REDIRECTION_LOOP_COOKIE)?.value) || 0;
  if (infiniteRedirectsCounter === 6) {
    throw new Error(infiniteRedirectLoopDetected());
  }
  if (req.headers.get("referer") === req.url) {
    res.cookies.set({
      name: INFINITE_REDIRECTION_LOOP_COOKIE,
      value: `${infiniteRedirectsCounter + 1}`,
      maxAge: 3
    });
  }
  return res;
};
const withNormalizedClerkUrl = (req) => {
  const clerkUrl = req.nextUrl.clone();
  const originUrl = buildRequestUrl(req);
  clerkUrl.port = originUrl.port;
  clerkUrl.protocol = 'https,http'; //originUrl.protocol;
  console.log('overriding withNormalizedClerkUrl in nextjs/dist/esm/server/authMiddleware');
  clerkUrl.host = originUrl.host;
  return Object.assign(req, { experimental_clerkUrl: clerkUrl });
};
const informAboutProtectedRoute = (path, params) => {
  if (params.debug || isDevelopmentFromApiKey(params.secretKey || SECRET_KEY)) {
    console.warn(
      informAboutProtectedRouteInfo(path, !!params.publicRoutes, !!params.ignoredRoutes, DEFAULT_IGNORED_ROUTES)
    );
  }
};
export {
  DEFAULT_API_ROUTES,
  DEFAULT_CONFIG_MATCHER,
  DEFAULT_IGNORED_ROUTES,
  authMiddleware,
  createRouteMatcher
};
//# sourceMappingURL=authMiddleware.js.map