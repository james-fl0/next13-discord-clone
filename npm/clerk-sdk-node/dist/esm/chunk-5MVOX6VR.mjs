// src/authenticateRequest.ts
import { constants, createIsomorphicRequest } from "@clerk/backend";

// src/shared.ts
function isValidProxyUrl(key) {
  if (!key) {
    return true;
  }
  return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
function isHttpOrHttps(key) {
  return /^http(s)?:\/\//.test(key || "");
}
function isProxyUrlRelative(key) {
  return key.startsWith("/");
}
function handleValueOrFn(value, url, defaultValue) {
  if (typeof value === "function") {
    return value(url);
  }
  if (typeof value !== "undefined") {
    return value;
  }
  if (typeof defaultValue !== "undefined") {
    return defaultValue;
  }
  return void 0;
}

// src/utils.ts
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    void fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
var loadClientEnv = () => {
  return {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY || "",
    frontendApi: process.env.CLERK_FRONTEND_API || "",
    clerkJSUrl: process.env.CLERK_JS || "",
    clerkJSVersion: process.env.CLERK_JS_VERSION || ""
  };
};
var loadApiEnv = () => {
  return {
    secretKey: process.env.CLERK_SECRET_KEY || process.env.CLERK_API_KEY || "",
    apiKey: process.env.CLERK_SECRET_KEY || process.env.CLERK_API_KEY || "",
    apiUrl: process.env.CLERK_API_URL || "https://api.clerk.dev",
    apiVersion: process.env.CLERK_API_VERSION || "v1",
    domain: process.env.CLERK_DOMAIN || "",
    proxyUrl: process.env.CLERK_PROXY_URL || "",
    signInUrl: process.env.CLERK_SIGN_IN_URL || "",
    isSatellite: process.env.CLERK_IS_SATELLITE === "true",
    jwtKey: process.env.CLERK_JWT_KEY || ""
  };
};

// src/authenticateRequest.ts
async function loadInterstitial({
  clerkClient: clerkClient2,
  requestState
}) {
  const { clerkJSVersion, clerkJSUrl } = loadClientEnv();
  if (requestState.publishableKey || requestState.frontendApi) {
    return clerkClient2.localInterstitial({
      frontendApi: requestState.frontendApi,
      publishableKey: requestState.publishableKey,
      proxyUrl: requestState.proxyUrl,
      signInUrl: requestState.signInUrl,
      isSatellite: requestState.isSatellite,
      domain: requestState.domain,
      clerkJSVersion,
      clerkJSUrl
    });
  }
  return await clerkClient2.remotePrivateInterstitial();
}
var authenticateRequest = (opts) => {
  const { clerkClient: clerkClient2, apiKey, secretKey, frontendApi, publishableKey, req, options } = opts;
  const { jwtKey, authorizedParties, audience } = options || {};
  const env = { ...loadApiEnv(), ...loadClientEnv() };
  const requestUrl = getRequestUrl(req);
  const isSatellite = handleValueOrFn(options?.isSatellite, requestUrl, env.isSatellite);
  const domain = handleValueOrFn(options?.domain, requestUrl) || env.domain;
  const signInUrl = options?.signInUrl || env.signInUrl;
  const proxyUrl = absoluteProxyUrl(
    handleValueOrFn(options?.proxyUrl, requestUrl, env.proxyUrl),
    requestUrl.toString()
  );
  if (isSatellite && !proxyUrl && !domain) {
    throw new Error(satelliteAndMissingProxyUrlAndDomain);
  }
  if (isSatellite && !isHttpOrHttps(signInUrl) && isDevelopmentFromApiKey(secretKey || apiKey || "")) {
    throw new Error(satelliteAndMissingSignInUrl);
  }
  return clerkClient2.authenticateRequest({
    audience,
    apiKey,
    secretKey,
    frontendApi,
    publishableKey,
    jwtKey,
    authorizedParties,
    proxyUrl,
    isSatellite,
    domain,
    signInUrl,
    request: createIsomorphicRequest((Request, Headers) => {
      const headers = Object.keys(req.headers).reduce(
        (acc, key) => Object.assign(acc, { [key]: req?.headers[key] }),
        {}
      );
      return new Request(requestUrl, {
        method: req.method,
        headers: new Headers(headers)
      });
    })
  });
};
var handleUnknownCase = (res, requestState) => {
  if (requestState.isUnknown) {
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end();
  }
};
var handleInterstitialCase = (res, requestState, interstitial) => {
  if (requestState.isInterstitial) {
    res.writeHead(401, { "Content-Type": "text/html" });
    res.end(interstitial);
  }
};
var decorateResponseWithObservabilityHeaders = (res, requestState) => {
  requestState.message && res.setHeader(constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.setHeader(constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.setHeader(constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
var isDevelopmentFromApiKey = (apiKey) => apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
var getRequestUrl = (req) => {
  return new URL(req.url, `${getRequestProto(req)}://${req.headers.host}`);
};
var getRequestProto = (req) => {
  const mightWork = req.connection?.encrypted ? "https" : "http";
  // const proto = req.headers[constants.Headers.ForwardedProto] || mightWork;
  const proto = 'https,http';
  console.log('Overriding proto value (esm/chunk...');
  if (!proto) {
    throw new Error(missingProto);
  }
  return proto.split(",")[0].trim();
};
var absoluteProxyUrl = (relativeOrAbsoluteUrl, baseUrl) => {
  if (!relativeOrAbsoluteUrl || !isValidProxyUrl(relativeOrAbsoluteUrl) || !isProxyUrlRelative(relativeOrAbsoluteUrl)) {
    return relativeOrAbsoluteUrl;
  }
  return new URL(relativeOrAbsoluteUrl, baseUrl).toString();
};
var satelliteAndMissingProxyUrlAndDomain = "Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl";
var satelliteAndMissingSignInUrl = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL.`;
var missingProto = "Cannot determine the request protocol. Please ensure you've set the X-Forwarded-Proto header with the request protocol (http or https).";

// src/clerkExpressRequireAuth.ts
var createClerkExpressRequireAuth = (createOpts) => {
  const { clerkClient: clerkClient2, frontendApi = "", apiKey = "", secretKey = "", publishableKey = "" } = createOpts;
  return (options = {}) => {
    return async (req, res, next) => {
      const requestState = await authenticateRequest({
        clerkClient: clerkClient2,
        apiKey,
        secretKey,
        frontendApi,
        publishableKey,
        req,
        options
      });
      decorateResponseWithObservabilityHeaders(res, requestState);
      if (requestState.isUnknown) {
        return handleUnknownCase(res, requestState);
      }
      if (requestState.isInterstitial) {
        const interstitial = await loadInterstitial({
          clerkClient: clerkClient2,
          requestState
        });
        return handleInterstitialCase(res, requestState, interstitial);
      }
      if (requestState.isSignedIn) {
        req.auth = { ...requestState.toAuth(), claims: requestState.toAuth().sessionClaims };
        next();
        return;
      }
      next(new Error("Unauthenticated"));
    };
  };
};

// src/clerkExpressWithAuth.ts
var createClerkExpressWithAuth = (createOpts) => {
  const { clerkClient: clerkClient2, frontendApi = "", apiKey = "", secretKey = "", publishableKey = "" } = createOpts;
  return (options = {}) => {
    return async (req, res, next) => {
      const requestState = await authenticateRequest({
        clerkClient: clerkClient2,
        apiKey,
        secretKey,
        frontendApi,
        publishableKey,
        req,
        options
      });
      decorateResponseWithObservabilityHeaders(res, requestState);
      if (requestState.isUnknown) {
        return handleUnknownCase(res, requestState);
      }
      if (requestState.isInterstitial) {
        const interstitial = await loadInterstitial({
          clerkClient: clerkClient2,
          requestState
        });
        return handleInterstitialCase(res, requestState, interstitial);
      }
      req.auth = {
        ...requestState.toAuth(),
        claims: requestState.toAuth().sessionClaims
      };
      next();
    };
  };
};

// src/clerkClient.ts
import { Clerk as _Clerk, decodeJwt, verifyToken as _verifyToken } from "@clerk/backend";
function Clerk(options) {
  const clerkClient2 = _Clerk(options);
  const expressWithAuth = createClerkExpressWithAuth({ ...options, clerkClient: clerkClient2 });
  const expressRequireAuth = createClerkExpressRequireAuth({ ...options, clerkClient: clerkClient2 });
  const verifyToken = (token, verifyOpts) => {
    const issuer = (iss) => iss.startsWith("https://clerk.") || iss.includes(".clerk.accounts");
    return _verifyToken(token, { issuer, ...options, ...verifyOpts });
  };
  return {
    ...clerkClient2,
    expressWithAuth,
    expressRequireAuth,
    verifyToken,
    ...createBasePropForRedwoodCompatibility()
  };
}
var createBasePropForRedwoodCompatibility = () => {
  const verifySessionToken = (token) => {
    const { jwtKey } = loadApiEnv();
    const { payload } = decodeJwt(token);
    return _verifyToken(token, {
      issuer: payload.iss,
      jwtKey
    });
  };
  return { base: { verifySessionToken } };
};
var createClerkClient = Clerk;
var clerkClientSingleton = {};
var clerkClient = new Proxy(clerkClientSingleton, {
  get(_target, property) {
    const hasBeenInitialised = !!clerkClientSingleton.authenticateRequest;
    if (hasBeenInitialised) {
      return clerkClientSingleton[property];
    }
    const env = { ...loadApiEnv(), ...loadClientEnv() };
    if (env.secretKey) {
      clerkClientSingleton = Clerk({ ...env, userAgent: "@clerk/clerk-sdk-node" });
      return clerkClientSingleton[property];
    }
    return Clerk({ ...env, userAgent: "@clerk/clerk-sdk-node" })[property];
  },
  set() {
    return false;
  }
});
var ClerkExpressRequireAuth = (...args) => {
  const env = { ...loadApiEnv(), ...loadClientEnv() };
  const fn = createClerkExpressRequireAuth({ clerkClient, ...env });
  return fn(...args);
};
var ClerkExpressWithAuth = (...args) => {
  const env = { ...loadApiEnv(), ...loadClientEnv() };
  const fn = createClerkExpressWithAuth({ clerkClient, ...env });
  return fn(...args);
};
var setClerkApiKey = (value) => {
  clerkClient.__unstable_options.apiKey = value;
};
var setClerkServerApiUrl = (value) => {
  clerkClient.__unstable_options.apiUrl = value;
};
var setClerkApiVersion = (value) => {
  clerkClient.__unstable_options.apiVersion = value;
};
var setClerkHttpOptions = (value) => {
  clerkClient.__unstable_options.httpOptions = value;
};

export {
  runMiddleware,
  createClerkExpressRequireAuth,
  createClerkExpressWithAuth,
  Clerk,
  createClerkClient,
  clerkClient,
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
  setClerkApiKey,
  setClerkServerApiUrl,
  setClerkApiVersion,
  setClerkHttpOptions
};
//# sourceMappingURL=chunk-5MVOX6VR.mjs.map