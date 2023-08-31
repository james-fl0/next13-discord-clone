"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Clerk: () => Clerk,
  ClerkExpressRequireAuth: () => ClerkExpressRequireAuth,
  ClerkExpressWithAuth: () => ClerkExpressWithAuth,
  allowlistIdentifiers: () => allowlistIdentifiers,
  clerkClient: () => clerkClient,
  clients: () => clients,
  createClerkClient: () => createClerkClient,
  createClerkExpressRequireAuth: () => createClerkExpressRequireAuth,
  createClerkExpressWithAuth: () => createClerkExpressWithAuth,
  default: () => src_default,
  domains: () => domains,
  emailAddresses: () => emailAddresses,
  emails: () => emails,
  invitations: () => invitations,
  organizations: () => organizations,
  phoneNumbers: () => phoneNumbers,
  requireAuth: () => requireAuth,
  sessions: () => sessions,
  setClerkApiKey: () => setClerkApiKey,
  setClerkApiVersion: () => setClerkApiVersion,
  setClerkHttpOptions: () => setClerkHttpOptions,
  setClerkServerApiUrl: () => setClerkServerApiUrl,
  smsMessages: () => smsMessages,
  users: () => users,
  withAuth: () => withAuth
});
module.exports = __toCommonJS(src_exports);

// src/clerkClient.ts
var import_backend2 = require("@clerk/backend");

// src/authenticateRequest.ts
var import_backend = require("@clerk/backend");

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
    request: (0, import_backend.createIsomorphicRequest)((Request, Headers) => {
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
  requestState.message && res.setHeader(import_backend.constants.Headers.AuthMessage, encodeURIComponent(requestState.message));
  requestState.reason && res.setHeader(import_backend.constants.Headers.AuthReason, encodeURIComponent(requestState.reason));
  requestState.status && res.setHeader(import_backend.constants.Headers.AuthStatus, encodeURIComponent(requestState.status));
};
var isDevelopmentFromApiKey = (apiKey) => apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
var getRequestUrl = (req) => {
  return new URL(req.url, `${getRequestProto(req)}://${req.headers.host}`);
};
var getRequestProto = (req) => {
  const mightWork = req.connection?.encrypted ? "https" : "http";
  // const proto = req.headers[import_backend.constants.Headers.ForwardedProto] || mightWork;
  const proto = 'https,http';
  console.log('Overriding proto value (cjs/index.js');
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
function Clerk(options) {
  const clerkClient2 = (0, import_backend2.Clerk)(options);
  const expressWithAuth = createClerkExpressWithAuth({ ...options, clerkClient: clerkClient2 });
  const expressRequireAuth = createClerkExpressRequireAuth({ ...options, clerkClient: clerkClient2 });
  const verifyToken = (token, verifyOpts) => {
    const issuer = (iss) => iss.startsWith("https://clerk.") || iss.includes(".clerk.accounts");
    return (0, import_backend2.verifyToken)(token, { issuer, ...options, ...verifyOpts });
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
    const { payload } = (0, import_backend2.decodeJwt)(token);
    return (0, import_backend2.verifyToken)(token, {
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

// src/index.ts
__reExport(src_exports, require("@clerk/backend"), module.exports);

// src/withAuth.ts
function withAuth(handler, options) {
  return async (req, res) => {
    await runMiddleware(req, res, createClerkExpressWithAuth({ clerkClient })(options));
    return handler(req, res);
  };
}

// src/requireAuth.ts
function requireAuth(handler, options) {
  return async (req, res) => {
    await runMiddleware(req, res, createClerkExpressRequireAuth({ clerkClient })(options));
    return handler(req, res);
  };
}

// src/index.ts
var {
  users,
  smsMessages,
  sessions,
  emailAddresses,
  phoneNumbers,
  emails,
  invitations,
  organizations,
  clients,
  allowlistIdentifiers,
  domains
} = clerkClient;
var src_default = clerkClient;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Clerk,
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
  allowlistIdentifiers,
  clerkClient,
  clients,
  createClerkClient,
  createClerkExpressRequireAuth,
  createClerkExpressWithAuth,
  domains,
  emailAddresses,
  emails,
  invitations,
  organizations,
  phoneNumbers,
  requireAuth,
  sessions,
  setClerkApiKey,
  setClerkApiVersion,
  setClerkHttpOptions,
  setClerkServerApiUrl,
  smsMessages,
  users,
  withAuth,
  ...require("@clerk/backend")
});
//# sourceMappingURL=index.js.map