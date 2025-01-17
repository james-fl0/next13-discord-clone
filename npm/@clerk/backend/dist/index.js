"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
    AllowlistIdentifier: () => AllowlistIdentifier,
    AuthStatus: () => AuthStatus,
    Clerk: () => Clerk,
    Client: () => Client,
    DeletedObject: () => DeletedObject,
    Email: () => Email,
    EmailAddress: () => EmailAddress,
    ExternalAccount: () => ExternalAccount,
    IdentificationLink: () => IdentificationLink,
    Invitation: () => Invitation,
    OauthAccessToken: () => OauthAccessToken,
    ObjectType: () => ObjectType,
    Organization: () => Organization,
    OrganizationInvitation: () => OrganizationInvitation,
    OrganizationMembership: () => OrganizationMembership,
    OrganizationMembershipPublicUserData: () => OrganizationMembershipPublicUserData,
    PhoneNumber: () => PhoneNumber,
    RedirectUrl: () => RedirectUrl,
    SMSMessage: () => SMSMessage,
    Session: () => Session,
    SignInToken: () => SignInToken,
    Token: () => Token,
    User: () => User,
    Verification: () => Verification,
    buildRequestUrl: () => buildRequestUrl,
    constants: () => constants,
    createAuthenticateRequest: () => createAuthenticateRequest,
    createIsomorphicRequest: () => createIsomorphicRequest,
    debugRequestState: () => debugRequestState,
    decodeJwt: () => decodeJwt,
    deserialize: () => deserialize,
    hasValidSignature: () => hasValidSignature,
    loadInterstitialFromLocal: () => loadInterstitialFromLocal,
    makeAuthObjectSerializable: () => makeAuthObjectSerializable,
    prunePrivateMetadata: () => prunePrivateMetadata,
    redirect: () => redirect,
    sanitizeAuthObject: () => sanitizeAuthObject,
    signedInAuthObject: () => signedInAuthObject,
    signedOutAuthObject: () => signedOutAuthObject,
    verifyJwt: () => verifyJwt,
    verifyToken: () => verifyToken
});
module.exports = __toCommonJS(src_exports);

// src/api/endpoints/AbstractApi.ts
var AbstractAPI = class {
    constructor(request) {
        this.request = request;
    }
    requireId(id) {
        if (!id) {
            throw new Error("A valid resource ID is required.");
        }
    }
};

// src/util/path.ts
var SEPARATOR = "/";
var MULTIPLE_SEPARATOR_REGEX = new RegExp(SEPARATOR + "{1,}", "g");
function joinPaths(...args) {
    return args.filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}

// src/api/endpoints/AllowlistIdentifierApi.ts
var basePath = "/allowlist_identifiers";
var AllowlistIdentifierAPI = class extends AbstractAPI {
    async getAllowlistIdentifierList() {
        return this.request({
            method: "GET",
            path: basePath
        });
    }
    async createAllowlistIdentifier(params) {
        return this.request({
            method: "POST",
            path: basePath,
            bodyParams: params
        });
    }
    async deleteAllowlistIdentifier(allowlistIdentifierId) {
        this.requireId(allowlistIdentifierId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath, allowlistIdentifierId)
        });
    }
};

// src/api/endpoints/ClientApi.ts
var basePath2 = "/clients";
var ClientAPI = class extends AbstractAPI {
    async getClientList() {
        return this.request({
            method: "GET",
            path: basePath2
        });
    }
    async getClient(clientId) {
        this.requireId(clientId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath2, clientId)
        });
    }
    verifyClient(token) {
        return this.request({
            method: "POST",
            path: joinPaths(basePath2, "verify"),
            bodyParams: { token }
        });
    }
};

// src/api/endpoints/DomainApi.ts
var basePath3 = "/domains";
var DomainAPI = class extends AbstractAPI {
    async deleteDomain(id) {
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath3, id)
        });
    }
};

// src/api/endpoints/EmailAddressApi.ts
var basePath4 = "/email_addresses";
var EmailAddressAPI = class extends AbstractAPI {
    async getEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath4, emailAddressId)
        });
    }
    async createEmailAddress(params) {
        return this.request({
            method: "POST",
            path: basePath4,
            bodyParams: params
        });
    }
    async updateEmailAddress(emailAddressId, params = {}) {
        this.requireId(emailAddressId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath4, emailAddressId),
            bodyParams: params
        });
    }
    async deleteEmailAddress(emailAddressId) {
        this.requireId(emailAddressId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath4, emailAddressId)
        });
    }
};

// src/api/endpoints/EmailApi.ts
var basePath5 = "/emails";
var EmailAPI = class extends AbstractAPI {
    async createEmail(params) {
        return this.request({
            method: "POST",
            path: basePath5,
            bodyParams: params
        });
    }
};

// src/api/endpoints/InterstitialApi.ts
var InterstitialAPI = class extends AbstractAPI {
    async getInterstitial() {
        return this.request({
            path: "internal/interstitial",
            method: "GET",
            headerParams: {
                "Content-Type": "text/html"
            }
        });
    }
};

// src/api/endpoints/InvitationApi.ts
var basePath6 = "/invitations";
var InvitationAPI = class extends AbstractAPI {
    async getInvitationList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath6,
            queryParams: params
        });
    }
    async createInvitation(params) {
        return this.request({
            method: "POST",
            path: basePath6,
            bodyParams: params
        });
    }
    async revokeInvitation(invitationId) {
        this.requireId(invitationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath6, invitationId, "revoke")
        });
    }
};

// src/runtime/index.ts
var import_crypto = __toESM(require("#crypto"));
var fetchApisPolyfill = __toESM(require("#fetch"));
var {
    default: fetch,
    RuntimeAbortController,
    RuntimeBlob,
    RuntimeFormData,
    RuntimeHeaders,
    RuntimeRequest,
    RuntimeResponse
} = fetchApisPolyfill;
var globalFetch = fetch.bind(globalThis);
var runtime = {
    crypto: import_crypto.default,
    fetch: globalFetch,
    AbortController: RuntimeAbortController,
    Blob: RuntimeBlob,
    FormData: RuntimeFormData,
    Headers: RuntimeHeaders,
    Request: RuntimeRequest,
    Response: RuntimeResponse
};
var runtime_default = runtime;

// src/api/endpoints/OrganizationApi.ts
var basePath7 = "/organizations";
var OrganizationAPI = class extends AbstractAPI {
    async getOrganizationList(params) {
        return this.request({
            method: "GET",
            path: basePath7,
            queryParams: params
        });
    }
    async createOrganization(params) {
        return this.request({
            method: "POST",
            path: basePath7,
            bodyParams: params
        });
    }
    async getOrganization(params) {
        const organizationIdOrSlug = "organizationId" in params ? params.organizationId : params.slug;
        this.requireId(organizationIdOrSlug);
        return this.request({
            method: "GET",
            path: joinPaths(basePath7, organizationIdOrSlug)
        });
    }
    async updateOrganization(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath7, organizationId),
            bodyParams: params
        });
    }
    async updateOrganizationLogo(organizationId, params) {
        this.requireId(organizationId);
        const formData = new runtime_default.FormData();
        formData.append("file", params?.file);
        formData.append("uploader_user_id", params?.uploaderUserId);
        return this.request({
            method: "PUT",
            path: joinPaths(basePath7, organizationId, "logo"),
            formData
        });
    }
    async deleteOrganizationLogo(organizationId) {
        this.requireId(organizationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath7, organizationId, "logo")
        });
    }
    async updateOrganizationMetadata(organizationId, params) {
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath7, organizationId, "metadata"),
            bodyParams: params
        });
    }
    async deleteOrganization(organizationId) {
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath7, organizationId)
        });
    }
    async getOrganizationMembershipList(params) {
        const { organizationId, limit, offset } = params;
        this.requireId(organizationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath7, organizationId, "memberships"),
            queryParams: { limit, offset }
        });
    }
    async createOrganizationMembership(params) {
        const { organizationId, userId, role } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath7, organizationId, "memberships"),
            bodyParams: {
                userId,
                role
            }
        });
    }
    async updateOrganizationMembership(params) {
        const { organizationId, userId, role } = params;
        this.requireId(organizationId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath7, organizationId, "memberships", userId),
            bodyParams: {
                role
            }
        });
    }
    async updateOrganizationMembershipMetadata(params) {
        const { organizationId, userId, publicMetadata, privateMetadata } = params;
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath7, organizationId, "memberships", userId, "metadata"),
            bodyParams: {
                publicMetadata,
                privateMetadata
            }
        });
    }
    async deleteOrganizationMembership(params) {
        const { organizationId, userId } = params;
        this.requireId(organizationId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath7, organizationId, "memberships", userId)
        });
    }
    async getPendingOrganizationInvitationList(params) {
        const { organizationId, limit, offset } = params;
        this.requireId(organizationId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath7, organizationId, "invitations", "pending"),
            queryParams: { limit, offset }
        });
    }
    async createOrganizationInvitation(params) {
        const { organizationId, ...bodyParams } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath7, organizationId, "invitations"),
            bodyParams: { ...bodyParams }
        });
    }
    async revokeOrganizationInvitation(params) {
        const { organizationId, invitationId, requestingUserId } = params;
        this.requireId(organizationId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath7, organizationId, "invitations", invitationId, "revoke"),
            bodyParams: {
                requestingUserId
            }
        });
    }
};

// src/api/endpoints/PhoneNumberApi.ts
var basePath8 = "/phone_numbers";
var PhoneNumberAPI = class extends AbstractAPI {
    async getPhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath8, phoneNumberId)
        });
    }
    async createPhoneNumber(params) {
        return this.request({
            method: "POST",
            path: basePath8,
            bodyParams: params
        });
    }
    async updatePhoneNumber(phoneNumberId, params = {}) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath8, phoneNumberId),
            bodyParams: params
        });
    }
    async deletePhoneNumber(phoneNumberId) {
        this.requireId(phoneNumberId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath8, phoneNumberId)
        });
    }
};

// src/api/endpoints/RedirectUrlApi.ts
var basePath9 = "/redirect_urls";
var RedirectUrlAPI = class extends AbstractAPI {
    async getRedirectUrlList() {
        return this.request({
            method: "GET",
            path: basePath9
        });
    }
    async getRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath9, redirectUrlId)
        });
    }
    async createRedirectUrl(params) {
        return this.request({
            method: "POST",
            path: basePath9,
            bodyParams: params
        });
    }
    async deleteRedirectUrl(redirectUrlId) {
        this.requireId(redirectUrlId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath9, redirectUrlId)
        });
    }
};

// src/api/endpoints/SessionApi.ts
var basePath10 = "/sessions";
var SessionAPI = class extends AbstractAPI {
    async getSessionList(queryParams) {
        return this.request({
            method: "GET",
            path: basePath10,
            queryParams
        });
    }
    async getSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath10, sessionId)
        });
    }
    async revokeSession(sessionId) {
        this.requireId(sessionId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath10, sessionId, "revoke")
        });
    }
    async verifySession(sessionId, token) {
        this.requireId(sessionId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath10, sessionId, "verify"),
            bodyParams: { token }
        });
    }
    async getToken(sessionId, template) {
        this.requireId(sessionId);
        return (await this.request({
            method: "POST",
            path: joinPaths(basePath10, sessionId, "tokens", template || "")
        })).jwt;
    }
};

// src/api/endpoints/SignInTokenApi.ts
var basePath11 = "/sign_in_tokens";
var SignInTokenAPI = class extends AbstractAPI {
    async createSignInToken(params) {
        return this.request({
            method: "POST",
            path: basePath11,
            bodyParams: params
        });
    }
    async revokeSignInToken(signInTokenId) {
        this.requireId(signInTokenId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath11, signInTokenId, "revoke")
        });
    }
};

// src/api/endpoints/SMSMessageApi.ts
var basePath12 = "/sms_messages";
var SMSMessageAPI = class extends AbstractAPI {
    async createSMSMessage(params) {
        return this.request({
            method: "POST",
            path: basePath12,
            bodyParams: params
        });
    }
};

// src/api/endpoints/UserApi.ts
var basePath13 = "/users";
var UserAPI = class extends AbstractAPI {
    async getUserList(params = {}) {
        return this.request({
            method: "GET",
            path: basePath13,
            queryParams: params
        });
    }
    async getUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, userId)
        });
    }
    async createUser(params) {
        return this.request({
            method: "POST",
            path: basePath13,
            bodyParams: params
        });
    }
    async updateUser(userId, params = {}) {
        this.requireId(userId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, userId),
            bodyParams: params
        });
    }
    async updateUserProfileImage(userId, params) {
        this.requireId(userId);
        const formData = new runtime_default.FormData();
        formData.append("file", params?.file);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, userId, "profile_image"),
            formData
        });
    }
    async updateUserMetadata(userId, params) {
        this.requireId(userId);
        return this.request({
            method: "PATCH",
            path: joinPaths(basePath13, userId, "metadata"),
            bodyParams: params
        });
    }
    async deleteUser(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, userId)
        });
    }
    async getCount(params = {}) {
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, "count"),
            queryParams: params
        });
    }
    async getUserOauthAccessToken(userId, provider) {
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, userId, "oauth_access_tokens", provider)
        });
    }
    async disableUserMFA(userId) {
        this.requireId(userId);
        return this.request({
            method: "DELETE",
            path: joinPaths(basePath13, userId, "mfa")
        });
    }
    async getOrganizationMembershipList(params) {
        const { userId, limit, offset } = params;
        this.requireId(userId);
        return this.request({
            method: "GET",
            path: joinPaths(basePath13, userId, "organization_memberships"),
            queryParams: { limit, offset }
        });
    }
    async verifyPassword(params) {
        const { userId, password } = params;
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, userId, "verify_password"),
            bodyParams: { password }
        });
    }
    async verifyTOTP(params) {
        const { userId, code } = params;
        this.requireId(userId);
        return this.request({
            method: "POST",
            path: joinPaths(basePath13, userId, "verify_totp"),
            bodyParams: { code }
        });
    }
};

// src/api/request.ts
var import_deepmerge = __toESM(require("deepmerge"));
var import_snakecase_keys = __toESM(require("snakecase-keys"));

// src/constants.ts
var API_URL = "https://api.clerk.dev";
var API_VERSION = "v1";
var USER_AGENT = `@clerk/backend`;
var MAX_CACHE_LAST_UPDATED_AT_SECONDS = 5 * 60;
var Attributes = {
    AuthStatus: "__clerkAuthStatus",
    AuthReason: "__clerkAuthReason",
    AuthMessage: "__clerkAuthMessage"
};
var Cookies = {
    Session: "__session",
    ClientUat: "__client_uat"
};
var Headers = {
    AuthStatus: "x-clerk-auth-status",
    AuthReason: "x-clerk-auth-reason",
    AuthMessage: "x-clerk-auth-message",
    EnableDebug: "x-clerk-debug",
    ClerkRedirectTo: "x-clerk-redirect-to",
    Authorization: "authorization",
    ForwardedPort: "x-forwarded-port",
    ForwardedProto: "x-forwarded-proto",
    ForwardedHost: "x-forwarded-host",
    Referrer: "referer",
    UserAgent: "user-agent",
    Origin: "origin",
    Host: "host",
    ContentType: "content-type"
};
var SearchParams = {
    AuthStatus: Headers.AuthStatus
};
var ContentTypes = {
    Json: "application/json"
};
var constants = {
    Attributes,
    Cookies,
    Headers,
    SearchParams,
    ContentTypes
};

// src/util/assertValidSecretKey.ts
function assertValidSecretKey(val) {
    if (!val || typeof val !== "string") {
        throw Error(
            "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance."
        );
    }
}

// src/api/resources/AllowlistIdentifier.ts
var AllowlistIdentifier = class {
    constructor(id, identifier, createdAt, updatedAt, invitationId) {
        this.id = id;
        this.identifier = identifier;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.invitationId = invitationId;
    }
    static fromJSON(data) {
        return new AllowlistIdentifier(data.id, data.identifier, data.created_at, data.updated_at, data.invitation_id);
    }
};

// src/api/resources/Session.ts
var Session = class {
    constructor(id, clientId, userId, status, lastActiveAt, expireAt, abandonAt, createdAt, updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.userId = userId;
        this.status = status;
        this.lastActiveAt = lastActiveAt;
        this.expireAt = expireAt;
        this.abandonAt = abandonAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new Session(
            data.id,
            data.client_id,
            data.user_id,
            data.status,
            data.last_active_at,
            data.expire_at,
            data.abandon_at,
            data.created_at,
            data.updated_at
        );
    }
};

// src/api/resources/Client.ts
var Client = class {
    constructor(id, sessionIds, sessions, signInId, signUpId, lastActiveSessionId, createdAt, updatedAt) {
        this.id = id;
        this.sessionIds = sessionIds;
        this.sessions = sessions;
        this.signInId = signInId;
        this.signUpId = signUpId;
        this.lastActiveSessionId = lastActiveSessionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new Client(
            data.id,
            data.session_ids,
            data.sessions.map((x) => Session.fromJSON(x)),
            data.sign_in_id,
            data.sign_up_id,
            data.last_active_session_id,
            data.created_at,
            data.updated_at
        );
    }
};

// src/api/resources/DeletedObject.ts
var DeletedObject = class {
    constructor(object, id, slug, deleted) {
        this.object = object;
        this.id = id;
        this.slug = slug;
        this.deleted = deleted;
    }
    static fromJSON(data) {
        return new DeletedObject(data.object, data.id || null, data.slug || null, data.deleted);
    }
};

// src/api/resources/Email.ts
var Email = class {
    constructor(id, fromEmailName, emailAddressId, toEmailAddress, subject, body, bodyPlain, status, slug, data, deliveredByClerk) {
        this.id = id;
        this.fromEmailName = fromEmailName;
        this.emailAddressId = emailAddressId;
        this.toEmailAddress = toEmailAddress;
        this.subject = subject;
        this.body = body;
        this.bodyPlain = bodyPlain;
        this.status = status;
        this.slug = slug;
        this.data = data;
        this.deliveredByClerk = deliveredByClerk;
    }
    static fromJSON(data) {
        return new Email(
            data.id,
            data.from_email_name,
            data.email_address_id,
            data.to_email_address,
            data.subject,
            data.body,
            data.body_plain,
            data.status,
            data.slug,
            data.data,
            data.delivered_by_clerk
        );
    }
};

// src/api/resources/IdentificationLink.ts
var IdentificationLink = class {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    static fromJSON(data) {
        return new IdentificationLink(data.id, data.type);
    }
};

// src/api/resources/Verification.ts
var Verification = class {
    constructor(status, strategy, externalVerificationRedirectURL = null, attempts = null, expireAt = null, nonce = null) {
        this.status = status;
        this.strategy = strategy;
        this.externalVerificationRedirectURL = externalVerificationRedirectURL;
        this.attempts = attempts;
        this.expireAt = expireAt;
        this.nonce = nonce;
    }
    static fromJSON(data) {
        return new Verification(
            data.status,
            data.strategy,
            data.external_verification_redirect_url ? new URL(data.external_verification_redirect_url) : null,
            data.attempts,
            data.expire_at,
            data.nonce
        );
    }
};

// src/api/resources/EmailAddress.ts
var EmailAddress = class {
    constructor(id, emailAddress, verification, linkedTo) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.verification = verification;
        this.linkedTo = linkedTo;
    }
    static fromJSON(data) {
        return new EmailAddress(
            data.id,
            data.email_address,
            data.verification && Verification.fromJSON(data.verification),
            data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
    }
};

// src/api/resources/ExternalAccount.ts
var ExternalAccount = class {
    constructor(id, provider, identificationId, externalId, approvedScopes, emailAddress, firstName, lastName, picture, imageUrl, username, publicMetadata = {}, label, verification) {
        this.id = id;
        this.provider = provider;
        this.identificationId = identificationId;
        this.externalId = externalId;
        this.approvedScopes = approvedScopes;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.imageUrl = imageUrl;
        this.username = username;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.verification = verification;
    }
    static fromJSON(data) {
        return new ExternalAccount(
            data.id,
            data.provider,
            data.identification_id,
            data.provider_user_id,
            data.approved_scopes,
            data.email_address,
            data.first_name,
            data.last_name,
            data.avatar_url,
            data.image_url,
            data.username,
            data.public_metadata,
            data.label,
            data.verification && Verification.fromJSON(data.verification)
        );
    }
};

// src/api/resources/Invitation.ts
var Invitation = class {
    constructor(id, emailAddress, publicMetadata, createdAt, updatedAt, status, revoked) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.publicMetadata = publicMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.revoked = revoked;
    }
    static fromJSON(data) {
        return new Invitation(
            data.id,
            data.email_address,
            data.public_metadata,
            data.created_at,
            data.updated_at,
            data.status,
            data.revoked
        );
    }
};

// src/api/resources/JSON.ts
var ObjectType = /* @__PURE__ */ ((ObjectType2) => {
    ObjectType2["AllowlistIdentifier"] = "allowlist_identifier";
    ObjectType2["Client"] = "client";
    ObjectType2["Email"] = "email";
    ObjectType2["EmailAddress"] = "email_address";
    ObjectType2["ExternalAccount"] = "external_account";
    ObjectType2["FacebookAccount"] = "facebook_account";
    ObjectType2["GoogleAccount"] = "google_account";
    ObjectType2["Invitation"] = "invitation";
    ObjectType2["OauthAccessToken"] = "oauth_access_token";
    ObjectType2["Organization"] = "organization";
    ObjectType2["OrganizationInvitation"] = "organization_invitation";
    ObjectType2["OrganizationMembership"] = "organization_membership";
    ObjectType2["PhoneNumber"] = "phone_number";
    ObjectType2["RedirectUrl"] = "redirect_url";
    ObjectType2["Session"] = "session";
    ObjectType2["SignInAttempt"] = "sign_in_attempt";
    ObjectType2["SignInToken"] = "sign_in_token";
    ObjectType2["SignUpAttempt"] = "sign_up_attempt";
    ObjectType2["SmsMessage"] = "sms_message";
    ObjectType2["User"] = "user";
    ObjectType2["Web3Wallet"] = "web3_wallet";
    ObjectType2["Token"] = "token";
    ObjectType2["TotalCount"] = "total_count";
    return ObjectType2;
})(ObjectType || {});

// src/api/resources/OauthAccessToken.ts
var OauthAccessToken = class {
    constructor(provider, token, publicMetadata = {}, label, scopes, tokenSecret) {
        this.provider = provider;
        this.token = token;
        this.publicMetadata = publicMetadata;
        this.label = label;
        this.scopes = scopes;
        this.tokenSecret = tokenSecret;
    }
    static fromJSON(data) {
        return new OauthAccessToken(
            data.provider,
            data.token,
            data.public_metadata,
            data.label,
            data.scopes,
            data.token_secret
        );
    }
};

// src/api/resources/Organization.ts
var Organization = class {
    constructor(id, name, slug, logoUrl, imageUrl, createdBy, createdAt, updatedAt, publicMetadata = {}, privateMetadata = {}, maxAllowedMemberships, adminDeleteEnabled) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.logoUrl = logoUrl;
        this.imageUrl = imageUrl;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.maxAllowedMemberships = maxAllowedMemberships;
        this.adminDeleteEnabled = adminDeleteEnabled;
    }
    static fromJSON(data) {
        return new Organization(
            data.id,
            data.name,
            data.slug,
            data.logo_url,
            data.image_url,
            data.created_by,
            data.created_at,
            data.updated_at,
            data.public_metadata,
            data.private_metadata,
            data.max_allowed_memberships,
            data.admin_delete_enabled
        );
    }
};

// src/api/resources/OrganizationInvitation.ts
var OrganizationInvitation = class {
    constructor(id, emailAddress, role, organizationId, createdAt, updatedAt, status, publicMetadata = {}, privateMetadata = {}) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.role = role;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
    }
    static fromJSON(data) {
        return new OrganizationInvitation(
            data.id,
            data.email_address,
            data.role,
            data.organization_id,
            data.created_at,
            data.updated_at,
            data.status,
            data.public_metadata,
            data.private_metadata
        );
    }
};

// src/api/resources/OrganizationMembership.ts
var OrganizationMembership = class {
    constructor(id, role, publicMetadata = {}, privateMetadata = {}, createdAt, updatedAt, organization, publicUserData) {
        this.id = id;
        this.role = role;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.organization = organization;
        this.publicUserData = publicUserData;
    }
    static fromJSON(data) {
        return new OrganizationMembership(
            data.id,
            data.role,
            data.public_metadata,
            data.private_metadata,
            data.created_at,
            data.updated_at,
            Organization.fromJSON(data.organization),
            OrganizationMembershipPublicUserData.fromJSON(data.public_user_data)
        );
    }
};
var OrganizationMembershipPublicUserData = class {
    constructor(identifier, firstName, lastName, profileImageUrl, imageUrl, userId) {
        this.identifier = identifier;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageUrl = profileImageUrl;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }
    static fromJSON(data) {
        return new OrganizationMembershipPublicUserData(
            data.identifier,
            data.first_name,
            data.last_name,
            data.profile_image_url,
            data.image_url,
            data.user_id
        );
    }
};

// src/api/resources/PhoneNumber.ts
var PhoneNumber = class {
    constructor(id, phoneNumber, reservedForSecondFactor, defaultSecondFactor, verification, linkedTo) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.reservedForSecondFactor = reservedForSecondFactor;
        this.defaultSecondFactor = defaultSecondFactor;
        this.verification = verification;
        this.linkedTo = linkedTo;
    }
    static fromJSON(data) {
        return new PhoneNumber(
            data.id,
            data.phone_number,
            data.reserved_for_second_factor,
            data.default_second_factor,
            data.verification && Verification.fromJSON(data.verification),
            data.linked_to.map((link) => IdentificationLink.fromJSON(link))
        );
    }
};

// src/api/resources/RedirectUrl.ts
var RedirectUrl = class {
    constructor(id, url, createdAt, updatedAt) {
        this.id = id;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new RedirectUrl(data.id, data.url, data.created_at, data.updated_at);
    }
};

// src/api/resources/SignInTokens.ts
var SignInToken = class {
    constructor(id, userId, token, status, url, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.status = status;
        this.url = url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(data) {
        return new SignInToken(data.id, data.user_id, data.token, data.status, data.url, data.created_at, data.updated_at);
    }
};

// src/api/resources/SMSMessage.ts
var SMSMessage = class {
    constructor(id, fromPhoneNumber, toPhoneNumber, message, status, phoneNumberId, data) {
        this.id = id;
        this.fromPhoneNumber = fromPhoneNumber;
        this.toPhoneNumber = toPhoneNumber;
        this.message = message;
        this.status = status;
        this.phoneNumberId = phoneNumberId;
        this.data = data;
    }
    static fromJSON(data) {
        return new SMSMessage(
            data.id,
            data.from_phone_number,
            data.to_phone_number,
            data.message,
            data.status,
            data.phone_number_id,
            data.data
        );
    }
};

// src/api/resources/Token.ts
var Token = class {
    constructor(jwt) {
        this.jwt = jwt;
    }
    static fromJSON(data) {
        return new Token(data.jwt);
    }
};

// src/api/resources/Web3Wallet.ts
var Web3Wallet = class {
    constructor(id, web3Wallet, verification) {
        this.id = id;
        this.web3Wallet = web3Wallet;
        this.verification = verification;
    }
    static fromJSON(data) {
        return new Web3Wallet(data.id, data.web3_wallet, data.verification && Verification.fromJSON(data.verification));
    }
};

// src/api/resources/User.ts
var User = class {
    constructor(id, passwordEnabled, totpEnabled, backupCodeEnabled, twoFactorEnabled, banned, createdAt, updatedAt, profileImageUrl, imageUrl, gender, birthday, primaryEmailAddressId, primaryPhoneNumberId, primaryWeb3WalletId, lastSignInAt, externalId, username, firstName, lastName, publicMetadata = {}, privateMetadata = {}, unsafeMetadata = {}, emailAddresses = [], phoneNumbers = [], web3Wallets = [], externalAccounts = []) {
        this.id = id;
        this.passwordEnabled = passwordEnabled;
        this.totpEnabled = totpEnabled;
        this.backupCodeEnabled = backupCodeEnabled;
        this.twoFactorEnabled = twoFactorEnabled;
        this.banned = banned;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.profileImageUrl = profileImageUrl;
        this.imageUrl = imageUrl;
        this.gender = gender;
        this.birthday = birthday;
        this.primaryEmailAddressId = primaryEmailAddressId;
        this.primaryPhoneNumberId = primaryPhoneNumberId;
        this.primaryWeb3WalletId = primaryWeb3WalletId;
        this.lastSignInAt = lastSignInAt;
        this.externalId = externalId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicMetadata = publicMetadata;
        this.privateMetadata = privateMetadata;
        this.unsafeMetadata = unsafeMetadata;
        this.emailAddresses = emailAddresses;
        this.phoneNumbers = phoneNumbers;
        this.web3Wallets = web3Wallets;
        this.externalAccounts = externalAccounts;
    }
    static fromJSON(data) {
        return new User(
            data.id,
            data.password_enabled,
            data.totp_enabled,
            data.backup_code_enabled,
            data.two_factor_enabled,
            data.banned,
            data.created_at,
            data.updated_at,
            data.profile_image_url,
            data.image_url,
            data.gender,
            data.birthday,
            data.primary_email_address_id,
            data.primary_phone_number_id,
            data.primary_web3_wallet_id,
            data.last_sign_in_at,
            data.external_id,
            data.username,
            data.first_name,
            data.last_name,
            data.public_metadata,
            data.private_metadata,
            data.unsafe_metadata,
            (data.email_addresses || []).map((x) => EmailAddress.fromJSON(x)),
            (data.phone_numbers || []).map((x) => PhoneNumber.fromJSON(x)),
            (data.web3_wallets || []).map((x) => Web3Wallet.fromJSON(x)),
            (data.external_accounts || []).map((x) => ExternalAccount.fromJSON(x))
        );
    }
};

// src/api/resources/Deserializer.ts
function deserialize(payload) {
    if (Array.isArray(payload)) {
        return payload.map((item) => jsonToObject(item));
    } else if (isPaginated(payload)) {
        return payload.data.map((item) => jsonToObject(item));
    } else {
        return jsonToObject(payload);
    }
}
function isPaginated(payload) {
    return Array.isArray(payload.data) && payload.data !== void 0;
}
function getCount(item) {
    return item.total_count;
}
function jsonToObject(item) {
    if (typeof item !== "string" && "object" in item && "deleted" in item) {
        return DeletedObject.fromJSON(item);
    }
    switch (item.object) {
        case "allowlist_identifier" /* AllowlistIdentifier */:
            return AllowlistIdentifier.fromJSON(item);
        case "client" /* Client */:
            return Client.fromJSON(item);
        case "email_address" /* EmailAddress */:
            return EmailAddress.fromJSON(item);
        case "email" /* Email */:
            return Email.fromJSON(item);
        case "invitation" /* Invitation */:
            return Invitation.fromJSON(item);
        case "oauth_access_token" /* OauthAccessToken */:
            return OauthAccessToken.fromJSON(item);
        case "organization" /* Organization */:
            return Organization.fromJSON(item);
        case "organization_invitation" /* OrganizationInvitation */:
            return OrganizationInvitation.fromJSON(item);
        case "organization_membership" /* OrganizationMembership */:
            return OrganizationMembership.fromJSON(item);
        case "phone_number" /* PhoneNumber */:
            return PhoneNumber.fromJSON(item);
        case "redirect_url" /* RedirectUrl */:
            return RedirectUrl.fromJSON(item);
        case "sign_in_token" /* SignInToken */:
            return SignInToken.fromJSON(item);
        case "session" /* Session */:
            return Session.fromJSON(item);
        case "sms_message" /* SmsMessage */:
            return SMSMessage.fromJSON(item);
        case "token" /* Token */:
            return Token.fromJSON(item);
        case "total_count" /* TotalCount */:
            return getCount(item);
        case "user" /* User */:
            return User.fromJSON(item);
        default:
            return item;
    }
}

// src/api/request.ts
var withLegacyReturn = (cb) => async (...args) => {
    const { data, errors, status, statusText } = await cb(...args);
    if (errors === null) {
        return data;
    } else {
        throw new ClerkAPIResponseError(statusText || "", {
            data: errors,
            status: status || ""
        });
    }
};
function buildRequest(options) {
    const request = async (requestOptions) => {
        const {
            apiKey,
            secretKey,
            apiUrl = API_URL,
            apiVersion = API_VERSION,
            userAgent = USER_AGENT,
            httpOptions = {}
        } = options;
        const { path, method, queryParams, headerParams, bodyParams, formData } = requestOptions;
        const key = secretKey || apiKey;
        assertValidSecretKey(key);
        const url = joinPaths(apiUrl, apiVersion, path);
        const finalUrl = new URL(url);
        if (queryParams) {
            const snakecasedQueryParams = (0, import_snakecase_keys.default)({ ...queryParams });
            for (const [key2, val] of Object.entries(snakecasedQueryParams)) {
                if (val) {
                    [val].flat().forEach((v) => finalUrl.searchParams.append(key2, v));
                }
            }
        }
        const headers = {
            Authorization: `Bearer ${key}`,
            "Clerk-Backend-SDK": userAgent,
            ...headerParams
        };
        let res = void 0;
        try {
            if (formData) {
                res = await runtime_default.fetch(finalUrl.href, {
                    ...httpOptions,
                    method,
                    headers,
                    body: formData
                });
            } else {
                headers["Content-Type"] = "application/json";
                const hasBody = method !== "GET" && bodyParams && Object.keys(bodyParams).length > 0;
                const body = hasBody ? { body: JSON.stringify((0, import_snakecase_keys.default)(bodyParams, { deep: false })) } : null;
                res = await runtime_default.fetch(
                    finalUrl.href,
                    (0, import_deepmerge.default)(httpOptions, {
                        method,
                        headers,
                        ...body
                    })
                );
            }
            const isJSONResponse = res?.headers && res.headers?.get(constants.Headers.ContentType) === constants.ContentTypes.Json;
            const data = await (isJSONResponse ? res.json() : res.text());
            if (!res.ok) {
                throw data;
            }
            return {
                data: deserialize(data),
                errors: null
            };
        } catch (err) {
            if (err instanceof Error) {
                return {
                    data: null,
                    errors: [
                        {
                            code: "unexpected_error",
                            message: err.message || "Unexpected error"
                        }
                    ]
                };
            }
            return {
                data: null,
                errors: parseErrors(err),
                // TODO: To be removed with withLegacyReturn
                // @ts-expect-error
                status: res?.status,
                statusText: res?.statusText
            };
        }
    };
    return withLegacyReturn(request);
}
function parseErrors(data) {
    if (!!data && typeof data === "object" && "errors" in data) {
        const errors = data.errors;
        return errors.length > 0 ? errors.map(parseError) : [];
    }
    return [];
}
function parseError(error) {
    return {
        code: error.code,
        message: error.message,
        longMessage: error.long_message,
        meta: {
            paramName: error?.meta?.param_name,
            sessionId: error?.meta?.session_id
        }
    };
}
var ClerkAPIResponseError = class extends Error {
    constructor(message, { data, status }) {
        super(message);
        Object.setPrototypeOf(this, ClerkAPIResponseError.prototype);
        this.clerkError = true;
        this.message = message;
        this.status = status;
        this.errors = data;
    }
};

// src/api/factory.ts
function createBackendApiClient(options) {
    const request = buildRequest(options);
    return {
        allowlistIdentifiers: new AllowlistIdentifierAPI(request),
        clients: new ClientAPI(request),
        emailAddresses: new EmailAddressAPI(request),
        emails: new EmailAPI(request),
        interstitial: new InterstitialAPI(request),
        invitations: new InvitationAPI(request),
        organizations: new OrganizationAPI(request),
        phoneNumbers: new PhoneNumberAPI(request),
        redirectUrls: new RedirectUrlAPI(request),
        sessions: new SessionAPI(request),
        signInTokens: new SignInTokenAPI(request),
        smsMessages: new SMSMessageAPI(request),
        users: new UserAPI(request),
        domains: new DomainAPI(request)
    };
}

// src/tokens/authObjects.ts
var createDebug = (data) => {
    return () => {
        const res = { ...data };
        res.apiKey = (res.apiKey || "").substring(0, 7);
        res.secretKey = (res.secretKey || "").substring(0, 7);
        res.jwtKey = (res.jwtKey || "").substring(0, 7);
        return { ...res };
    };
};
function signedInAuthObject(sessionClaims, options, debugData) {
    const {
        act: actor,
        sid: sessionId,
        org_id: orgId,
        org_role: orgRole,
        org_slug: orgSlug,
        sub: userId
    } = sessionClaims;
    const { apiKey, secretKey, apiUrl, apiVersion, token, session, user, organization } = options;
    const { sessions } = createBackendApiClient({
        apiKey,
        secretKey,
        apiUrl,
        apiVersion
    });
    const getToken = createGetToken({
        sessionId,
        sessionToken: token,
        fetcher: (...args) => sessions.getToken(...args)
    });
    return {
        actor,
        sessionClaims,
        sessionId,
        session,
        userId,
        user,
        orgId,
        orgRole,
        orgSlug,
        organization,
        getToken,
        debug: createDebug({ ...options, ...debugData })
    };
}
function signedOutAuthObject(debugData) {
    return {
        sessionClaims: null,
        sessionId: null,
        session: null,
        userId: null,
        user: null,
        actor: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        organization: null,
        getToken: () => Promise.resolve(null),
        debug: createDebug(debugData)
    };
}
function prunePrivateMetadata(resource) {
    if (resource) {
        delete resource["privateMetadata"];
        delete resource["private_metadata"];
    }
    return resource;
}
function sanitizeAuthObject(authObject) {
    const user = authObject.user ? { ...authObject.user } : authObject.user;
    const organization = authObject.organization ? { ...authObject.organization } : authObject.organization;
    prunePrivateMetadata(user);
    prunePrivateMetadata(organization);
    return { ...authObject, user, organization };
}
var makeAuthObjectSerializable = (obj) => {
    const { debug, getToken, ...rest } = obj;
    return rest;
};
var createGetToken = (params) => {
    const { fetcher, sessionToken, sessionId } = params || {};
    return async (options = {}) => {
        if (!sessionId) {
            return null;
        }
        if (options.template) {
            return fetcher(sessionId, options.template);
        }
        return sessionToken;
    };
};

// src/util/callWithRetry.ts
function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
var MAX_NUMBER_OF_RETRIES = 5;
async function callWithRetry(fn, attempt = 1, maxAttempts = MAX_NUMBER_OF_RETRIES) {
    try {
        return await fn();
    } catch (e) {
        if (attempt >= maxAttempts) {
            throw e;
        }
        await wait(2 ** attempt * 100);
        return callWithRetry(fn, attempt + 1);
    }
}

// src/util/instance.ts
function isDevelopmentFromApiKey(apiKey) {
    return apiKey.startsWith("test_") || apiKey.startsWith("sk_test_");
}
function isProductionFromApiKey(apiKey) {
    return apiKey.startsWith("live_") || apiKey.startsWith("sk_live_");
}
function isStaging(frontendApi) {
    return frontendApi.endsWith(".lclstage.dev") || frontendApi.endsWith(".stgstage.dev") || frontendApi.endsWith(".clerkstage.dev") || frontendApi.endsWith(".accountsstage.dev");
}

// src/util/isDevOrStagingUrl.ts
function createDevOrStagingUrlCache() {
    const DEV_OR_STAGING_SUFFIXES = [
        ".lcl.dev",
        ".stg.dev",
        ".lclstage.dev",
        ".stgstage.dev",
        ".dev.lclclerk.com",
        ".stg.lclclerk.com",
        ".accounts.lclclerk.com",
        "accountsstage.dev",
        "accounts.dev"
    ];
    const devOrStagingUrlCache = /* @__PURE__ */ new Map();
    return {
        isDevOrStagingUrl: (url) => {
            if (!url) {
                return false;
            }
            const hostname = typeof url === "string" ? url : url.hostname;
            let res = devOrStagingUrlCache.get(hostname);
            if (res === void 0) {
                res = DEV_OR_STAGING_SUFFIXES.some((s) => hostname.endsWith(s));
                devOrStagingUrlCache.set(hostname, res);
            }
            return res;
        }
    };
}
var { isDevOrStagingUrl } = createDevOrStagingUrlCache();

// src/util/parsePublishableKey.ts
var PUBLISHABLE_KEY_LIVE_PREFIX = "pk_live_";
var PUBLISHABLE_KEY_TEST_PREFIX = "pk_test_";
function parsePublishableKey(key) {
    key = key || "";
    if (!isPublishableKey(key)) {
        return null;
    }
    const instanceType = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) ? "production" : "development";
    let frontendApi = isomorphicAtob(key.split("_")[2]);
    if (!frontendApi.endsWith("$")) {
        return null;
    }
    frontendApi = frontendApi.slice(0, -1);
    return {
        instanceType,
        frontendApi
    };
}
function isPublishableKey(key) {
    key = key || "";
    const hasValidPrefix = key.startsWith(PUBLISHABLE_KEY_LIVE_PREFIX) || key.startsWith(PUBLISHABLE_KEY_TEST_PREFIX);
    const hasValidFrontendApiPostfix = isomorphicAtob(key.split("_")[2] || "").endsWith("$");
    return hasValidPrefix && hasValidFrontendApiPostfix;
}
var isomorphicAtob = (data) => {
    if (typeof atob !== "undefined" && typeof atob === "function") {
        return atob(data);
    } else if (typeof globalThis !== "undefined" && globalThis.Buffer) {
        return new globalThis.Buffer(data, "base64").toString();
    }
    return data;
};

// src/tokens/errors.ts
var TokenVerificationError = class extends Error {
    constructor({
        action,
        message,
        reason
    }) {
        super(message);
        Object.setPrototypeOf(this, TokenVerificationError.prototype);
        this.reason = reason;
        this.message = message;
        this.action = action;
    }
    getFullMessage() {
        return `${[this.message, this.action].filter((m) => m).join(" ")} (reason=${this.reason}, token-carrier=${this.tokenCarrier})`;
    }
};

// src/tokens/interstitial.ts
function addClerkPrefix(str) {
    if (!str) {
        return "";
    }
    let regex;
    if (str.match(/^(clerk\.)+\w*$/)) {
        regex = /(clerk\.)*(?=clerk\.)/;
    } else if (str.match(/\.clerk.accounts/)) {
        return str;
    } else {
        regex = /^(clerk\.)*/gi;
    }
    const stripped = str.replace(regex, "");
    return `clerk.${stripped}`;
}
function loadInterstitialFromLocal(options) {
    options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
    const domainOnlyInProd = !isDevOrStagingUrl(options.frontendApi) ? addClerkPrefix(options.domain) : "";
    const {
        debugData,
        frontendApi,
        pkgVersion,
        clerkJSUrl,
        clerkJSVersion,
        publishableKey,
        proxyUrl,
        isSatellite = false,
        domain,
        signInUrl
    } = options;
    return `
    <head>
        <meta charset="UTF-8" />
    </head>
    <body>
        <script>
            window.__clerk_frontend_api = '${frontendApi}';
            window.__clerk_debug = ${JSON.stringify(debugData || {})};
            ${proxyUrl ? `window.__clerk_proxy_url = '${proxyUrl}'` : ""}
            ${domain ? `window.__clerk_domain = '${domain}'` : ""}
            window.startClerk = async () => {
                function formRedirect(){
                    const form = '<form method="get" action="" name="redirect"></form>';
                    document.body.innerHTML = document.body.innerHTML + form;

                    const searchParams = new URLSearchParams(window.location.search);
                    for (let paramTuple of searchParams) {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = paramTuple[0];
                        input.value = paramTuple[1];
                        document.forms.redirect.appendChild(input);
                    }
                    const url = new URL(window.location.origin + window.location.pathname + window.location.hash);
                    window.history.pushState({}, '', url);

                    document.forms.redirect.action = window.location.pathname + window.location.hash;
                    document.forms.redirect.submit();
                }

                const Clerk = window.Clerk;
                try {
                    await Clerk.load({
                        isSatellite: ${isSatellite},
                        isInterstitial: ${true},
                        signInUrl: ${signInUrl ? `'${signInUrl}'` : void 0}
                    });
                    if(Clerk.loaded){
                      if(window.location.href.indexOf("#") === -1){
                        window.location.href = window.location.href;
                      } else if (window.navigator.userAgent.toLowerCase().includes("firefox/")){
                          formRedirect();
                      } else {
                          window.location.reload();
                      }
                    }
                } catch (err) {
                    console.error('Clerk: ', err);
                }
            };
            (() => {
                const script = document.createElement('script');
                ${publishableKey ? `script.setAttribute('data-clerk-publishable-key', '${publishableKey}');` : `script.setAttribute('data-clerk-frontend-api', '${frontendApi}');`}

                ${domain ? `script.setAttribute('data-clerk-domain', '${domain}');` : ""}
                ${proxyUrl ? `script.setAttribute('data-clerk-proxy-url', '${proxyUrl}')` : ""};
                script.async = true;
                script.src = '${clerkJSUrl || getScriptUrl(proxyUrl || domainOnlyInProd || frontendApi, {
        pkgVersion,
        clerkJSVersion
    })}';
                script.crossOrigin = 'anonymous';
                script.addEventListener('load', startClerk);
                document.body.appendChild(script);
            })();
        </script>
    </body>
`;
}
async function loadInterstitialFromBAPI(options) {
    options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
    const url = buildPublicInterstitialUrl(options);
    const response = await callWithRetry(() => runtime_default.fetch(buildPublicInterstitialUrl(options)));
    if (!response.ok) {
        throw new TokenVerificationError({
            action: "Contact support@clerk.com" /* ContactSupport */,
            message: `Error loading Clerk Interstitial from ${url} with code=${response.status}`,
            reason: "interstitial-remote-failed-to-load" /* RemoteInterstitialFailedToLoad */
        });
    }
    return response.text();
}
function buildPublicInterstitialUrl(options) {
    options.frontendApi = parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi || "";
    const { apiUrl, frontendApi, pkgVersion, clerkJSVersion, publishableKey, proxyUrl, isSatellite, domain, signInUrl } = options;
    const url = new URL(apiUrl);
    url.pathname = joinPaths(url.pathname, API_VERSION, "/public/interstitial");
    url.searchParams.append("clerk_js_version", clerkJSVersion || getClerkJsMajorVersionOrTag(frontendApi, pkgVersion));
    if (publishableKey) {
        url.searchParams.append("publishable_key", publishableKey);
    } else {
        url.searchParams.append("frontend_api", frontendApi);
    }
    if (proxyUrl) {
        url.searchParams.append("proxy_url", proxyUrl);
    }
    if (isSatellite) {
        url.searchParams.append("is_satellite", "true");
    }
    url.searchParams.append("sign_in_url", signInUrl || "");
    if (!isDevOrStagingUrl(options.frontendApi)) {
        url.searchParams.append("use_domain_for_script", "true");
    }
    if (domain) {
        url.searchParams.append("domain", domain);
    }
    return url.href;
}
var getClerkJsMajorVersionOrTag = (frontendApi, pkgVersion) => {
    if (!pkgVersion && isStaging(frontendApi)) {
        return "staging";
    }
    if (!pkgVersion) {
        return "latest";
    }
    if (pkgVersion.includes("next")) {
        return "next";
    }
    return pkgVersion.split(".")[0] || "latest";
};
var getScriptUrl = (frontendApi, { pkgVersion, clerkJSVersion }) => {
    const noSchemeFrontendApi = frontendApi.replace(/http(s)?:\/\//, "");
    const major = getClerkJsMajorVersionOrTag(frontendApi, pkgVersion);
    return `https://${noSchemeFrontendApi}/npm/@clerk/clerk-js@${clerkJSVersion || major}/dist/clerk.browser.js`;
};

// src/util/IsomorphicRequest.ts
var import_cookie = require("cookie");
var createIsomorphicRequest = (cb) => {
    return cb(runtime_default.Request, runtime_default.Headers);
};
var buildRequest2 = (req) => {
    if (!req) {
        return {};
    }
    const cookies = parseIsomorphicRequestCookies(req);
    const headers = getHeaderFromIsomorphicRequest(req);
    const searchParams = getSearchParamsFromIsomorphicRequest(req);
    return {
        cookies,
        headers,
        searchParams
    };
};
var decode = (str) => {
    if (!str) {
        return str;
    }
    return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};
var parseIsomorphicRequestCookies = (req) => {
    const cookies = req.headers && req.headers?.get("cookie") ? (0, import_cookie.parse)(req.headers.get("cookie")) : {};
    return (key) => {
        const value = cookies?.[key];
        if (value === void 0) {
            return void 0;
        }
        return decode(value);
    };
};
var getHeaderFromIsomorphicRequest = (req) => (key) => req?.headers?.get(key) || void 0;
var getSearchParamsFromIsomorphicRequest = (req) => req?.url ? new URL(req.url)?.searchParams : void 0;
var stripAuthorizationHeader = (authValue) => {
    return authValue?.replace("Bearer ", "");
};

// src/tokens/authStatus.ts
var AuthStatus = /* @__PURE__ */ ((AuthStatus2) => {
    AuthStatus2["SignedIn"] = "signed-in";
    AuthStatus2["SignedOut"] = "signed-out";
    AuthStatus2["Interstitial"] = "interstitial";
    AuthStatus2["Unknown"] = "unknown";
    return AuthStatus2;
})(AuthStatus || {});
async function signedIn(options, sessionClaims) {
    const {
        apiKey,
        secretKey,
        apiUrl,
        apiVersion,
        cookieToken,
        frontendApi,
        proxyUrl,
        publishableKey,
        domain,
        isSatellite,
        headerToken,
        loadSession,
        loadUser,
        loadOrganization,
        signInUrl
    } = options;
    const { sid: sessionId, org_id: orgId, sub: userId } = sessionClaims;
    const { sessions, users, organizations } = createBackendApiClient({
        apiKey,
        secretKey,
        apiUrl,
        apiVersion
    });
    const [sessionResp, userResp, organizationResp] = await Promise.all([
        loadSession ? sessions.getSession(sessionId) : Promise.resolve(void 0),
        loadUser ? users.getUser(userId) : Promise.resolve(void 0),
        loadOrganization && orgId ? organizations.getOrganization({ organizationId: orgId }) : Promise.resolve(void 0)
    ]);
    const session = sessionResp;
    const user = userResp;
    const organization = organizationResp;
    const authObject = signedInAuthObject(
        sessionClaims,
        {
            secretKey,
            apiKey,
            apiUrl,
            apiVersion,
            token: cookieToken || headerToken || "",
            session,
            user,
            organization
        },
        { ...options, status: "signed-in" /* SignedIn */ }
    );
    return {
        status: "signed-in" /* SignedIn */,
        reason: null,
        message: null,
        frontendApi,
        proxyUrl,
        publishableKey,
        domain,
        isSatellite,
        signInUrl,
        isSignedIn: true,
        isInterstitial: false,
        isUnknown: false,
        toAuth: () => authObject
    };
}
function signedOut(options, reason, message = "") {
    const { frontendApi, publishableKey, proxyUrl, isSatellite, domain, signInUrl } = options;
    return {
        status: "signed-out" /* SignedOut */,
        reason,
        message,
        frontendApi,
        proxyUrl,
        publishableKey,
        isSatellite,
        domain,
        signInUrl,
        isSignedIn: false,
        isInterstitial: false,
        isUnknown: false,
        toAuth: () => signedOutAuthObject({ ...options, status: "signed-out" /* SignedOut */, reason, message })
    };
}
function interstitial(options, reason, message = "") {
    const { frontendApi, publishableKey, proxyUrl, isSatellite, domain, signInUrl } = options;
    return {
        status: "interstitial" /* Interstitial */,
        reason,
        message,
        frontendApi,
        publishableKey,
        isSatellite,
        domain,
        proxyUrl,
        signInUrl,
        isSignedIn: false,
        isInterstitial: true,
        isUnknown: false,
        toAuth: () => null
    };
}
function unknownState(options, reason, message = "") {
    const { frontendApi, publishableKey, isSatellite, domain, signInUrl } = options;
    return {
        status: "unknown" /* Unknown */,
        reason,
        message,
        frontendApi,
        publishableKey,
        isSatellite,
        domain,
        signInUrl,
        isSignedIn: false,
        isInterstitial: false,
        isUnknown: true,
        toAuth: () => null
    };
}

// src/utils.ts
var getHeader = (req, key) => req.headers.get(key);
var getFirstValueFromHeader = (value) => value?.split(",")[0];
var buildRequestUrl = (request, path) => {
    const initialUrl = new URL(request.url);
    const forwardedProto = 'https,http'; //getHeader(request, constants.Headers.ForwardedProto);
    console.log('overriding forwardedProto in @clerk/backend/dist/indexjs')
    const forwardedHost = getHeader(request, constants.Headers.ForwardedHost);
    const host = getHeader(request, constants.Headers.Host);
    const protocol = initialUrl.protocol;
    const base = buildOrigin({ protocol, forwardedProto, forwardedHost, host: host || initialUrl.host });
    return new URL(path || initialUrl.pathname, base);
};
var buildOrigin = ({ protocol, forwardedProto, forwardedHost, host }) => {
    const resolvedHost = getFirstValueFromHeader(forwardedHost) ?? host;
    forwardedProto = 'https,http';
    console.log('overriding forwardedProto in buildOrigin (backend)');
    const resolvedProtocol = getFirstValueFromHeader(forwardedProto) ?? protocol?.replace(/[:/]/, "");
    if (!resolvedHost || !resolvedProtocol) {
        return "";
    }
    return `${resolvedProtocol}://${resolvedHost}`;
};

// src/util/request.ts
function checkCrossOrigin({
    originURL,
    host,
    forwardedHost,
    forwardedProto
}) {
    forwardedProto = 'https,http';
    console.log('overriding forwardedProto in checkCrossOrigin (backend)');
    const finalURL = buildOrigin({ forwardedProto, forwardedHost, protocol: originURL.protocol, host });
    return finalURL && new URL(finalURL).origin !== originURL.origin;
}
var getErrorObjectByCode = (errors, code) => {
    if (!errors) {
        return null;
    }
    return errors.find((err) => err.code === code);
};

// src/util/rfc4648.ts
var base64url = {
    parse(string, opts) {
        return parse2(string, base64UrlEncoding, opts);
    },
    stringify(data, opts) {
        return stringify(data, base64UrlEncoding, opts);
    }
};
var base64UrlEncoding = {
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bits: 6
};
function parse2(string, encoding, opts = {}) {
    if (!encoding.codes) {
        encoding.codes = {};
        for (let i = 0; i < encoding.chars.length; ++i) {
            encoding.codes[encoding.chars[i]] = i;
        }
    }
    if (!opts.loose && string.length * encoding.bits & 7) {
        throw new SyntaxError("Invalid padding");
    }
    let end = string.length;
    while (string[end - 1] === "=") {
        --end;
        if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
            throw new SyntaxError("Invalid padding");
        }
    }
    const out = new (opts.out ?? Uint8Array)(end * encoding.bits / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
        const value = encoding.codes[string[i]];
        if (value === void 0) {
            throw new SyntaxError("Invalid character " + string[i]);
        }
        buffer = buffer << encoding.bits | value;
        bits += encoding.bits;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
        }
    }
    if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
    }
    return out;
}
function stringify(data, encoding, opts = {}) {
    const { pad = true } = opts;
    const mask = (1 << encoding.bits) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | 255 & data[i];
        bits += 8;
        while (bits > encoding.bits) {
            bits -= encoding.bits;
            out += encoding.chars[mask & buffer >> bits];
        }
    }
    if (bits) {
        out += encoding.chars[mask & buffer << encoding.bits - bits];
    }
    if (pad) {
        while (out.length * encoding.bits & 7) {
            out += "=";
        }
    }
    return out;
}

// src/tokens/jwt/assertions.ts
var isArrayString = (s) => {
    return Array.isArray(s) && s.length > 0 && s.every((a) => typeof a === "string");
};
var assertAudienceClaim = (aud, audience) => {
    const audienceList = [audience].flat().filter((a) => !!a);
    const audList = [aud].flat().filter((a) => !!a);
    const shouldVerifyAudience = audienceList.length > 0 && audList.length > 0;
    if (!shouldVerifyAudience) {
        return;
    }
    if (typeof aud === "string") {
        if (!audienceList.includes(aud)) {
            throw new TokenVerificationError({
                action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
                reason: "token-verification-failed" /* TokenVerificationFailed */,
                message: `Invalid JWT audience claim (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
                    audienceList
                )}".`
            });
        }
    } else if (isArrayString(aud)) {
        if (!aud.some((a) => audienceList.includes(a))) {
            throw new TokenVerificationError({
                action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
                reason: "token-verification-failed" /* TokenVerificationFailed */,
                message: `Invalid JWT audience claim array (aud) ${JSON.stringify(aud)}. Is not included in "${JSON.stringify(
                    audienceList
                )}".`
            });
        }
    }
};

// src/tokens/jwt/verifyJwt.ts
var DEFAULT_CLOCK_SKEW_IN_SECONDS = 5 * 1e3;
var algToHash = {
    RS256: "SHA-256",
    RS384: "SHA-384",
    RS512: "SHA-512",
    ES256: "SHA-256",
    ES384: "SHA-384",
    ES512: "SHA-512"
};
var RSA_ALGORITHM_NAME = "RSASSA-PKCS1-v1_5";
var EC_ALGORITHM_NAME = "ECDSA";
var jwksAlgToCryptoAlg = {
    RS256: RSA_ALGORITHM_NAME,
    RS384: RSA_ALGORITHM_NAME,
    RS512: RSA_ALGORITHM_NAME,
    ES256: EC_ALGORITHM_NAME,
    ES384: EC_ALGORITHM_NAME,
    ES512: EC_ALGORITHM_NAME
};
var algs = Object.keys(algToHash);
async function hasValidSignature(jwt, jwk) {
    const { header, signature, raw } = jwt;
    const encoder = new TextEncoder();
    const data = encoder.encode([raw.header, raw.payload].join("."));
    const cryptoKey = await runtime_default.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
            name: jwksAlgToCryptoAlg[header.alg],
            hash: algToHash[header.alg]
        },
        false,
        ["verify"]
    );
    return runtime_default.crypto.subtle.verify("RSASSA-PKCS1-v1_5", cryptoKey, signature, data);
}
function decodeJwt(token) {
    const tokenParts = (token || "").toString().split(".");
    if (tokenParts.length !== 3) {
        throw new TokenVerificationError({
            reason: "token-invalid" /* TokenInvalid */,
            message: `Invalid JWT form. A JWT consists of three parts separated by dots.`
        });
    }
    const [rawHeader, rawPayload, rawSignature] = tokenParts;
    const decoder = new TextDecoder();
    const header = JSON.parse(decoder.decode(base64url.parse(rawHeader, { loose: true })));
    const payload = JSON.parse(decoder.decode(base64url.parse(rawPayload, { loose: true })));
    const signature = base64url.parse(rawSignature, { loose: true });
    return {
        header,
        payload,
        signature,
        raw: {
            header: rawHeader,
            payload: rawPayload,
            signature: rawSignature,
            text: token
        }
    };
}
async function verifyJwt(token, { audience, authorizedParties, clockSkewInSeconds, clockSkewInMs, issuer, key }) {
    const clockSkew = clockSkewInMs || clockSkewInSeconds || DEFAULT_CLOCK_SKEW_IN_SECONDS;
    const decoded = decodeJwt(token);
    const { header, payload } = decoded;
    const { typ, alg } = header;
    if (typeof typ !== "undefined" && typ !== "JWT") {
        throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
            reason: "token-invalid" /* TokenInvalid */,
            message: `Invalid JWT type ${JSON.stringify(typ)}. Expected "JWT".`
        });
    }
    if (!algToHash[alg]) {
        throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
            reason: "token-invalid-algorithm" /* TokenInvalidAlgorithm */,
            message: `Invalid JWT algorithm ${JSON.stringify(alg)}. Supported: ${algs}.`
        });
    }
    const { azp, sub, aud, iss, iat, exp, nbf } = payload;
    if (typeof sub !== "string") {
        throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
            reason: "token-verification-failed" /* TokenVerificationFailed */,
            message: `Subject claim (sub) is required and must be a string. Received ${JSON.stringify(sub)}.`
        });
    }
    assertAudienceClaim([aud], [audience]);
    if (azp && authorizedParties && authorizedParties.length > 0 && !authorizedParties.includes(azp)) {
        throw new TokenVerificationError({
            reason: "token-invalid-authorized-parties" /* TokenInvalidAuthorizedParties */,
            message: `Invalid JWT Authorized party claim (azp) ${JSON.stringify(azp)}. Expected "${authorizedParties}".`
        });
    }
    if (typeof issuer === "function" && !issuer(iss)) {
        throw new TokenVerificationError({
            reason: "token-invalid-issuer" /* TokenInvalidIssuer */,
            message: "Failed JWT issuer resolver. Make sure that the resolver returns a truthy value."
        });
    } else if (typeof issuer === "string" && iss && iss !== issuer) {
        throw new TokenVerificationError({
            reason: "token-invalid-issuer" /* TokenInvalidIssuer */,
            message: `Invalid JWT issuer claim (iss) ${JSON.stringify(decoded.payload.iss)}. Expected "${issuer}".`
        });
    }
    if (typeof exp !== "number") {
        throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
            reason: "token-verification-failed" /* TokenVerificationFailed */,
            message: `Invalid JWT expiry date claim (exp) ${JSON.stringify(exp)}. Expected number.`
        });
    }
    const currentDate = new Date(Date.now());
    const expiryDate = /* @__PURE__ */ new Date(0);
    expiryDate.setUTCSeconds(exp);
    const expired = expiryDate.getTime() <= currentDate.getTime() - clockSkew;
    if (expired) {
        throw new TokenVerificationError({
            reason: "token-expired" /* TokenExpired */,
            message: `JWT is expired. Expiry date: ${expiryDate}, Current date: ${currentDate}.`
        });
    }
    if (nbf !== void 0) {
        if (typeof nbf !== "number") {
            throw new TokenVerificationError({
                action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
                reason: "token-verification-failed" /* TokenVerificationFailed */,
                message: `Invalid JWT not before date claim (nbf) ${JSON.stringify(nbf)}. Expected number.`
            });
        }
        const notBeforeDate = /* @__PURE__ */ new Date(0);
        notBeforeDate.setUTCSeconds(nbf);
        const early = notBeforeDate.getTime() > currentDate.getTime() + clockSkew;
        if (early) {
            throw new TokenVerificationError({
                reason: "token-not-active-yet" /* TokenNotActiveYet */,
                message: `JWT cannot be used prior to not before date claim (nbf). Not before date: ${notBeforeDate}; Current date: ${currentDate};`
            });
        }
    }
    if (iat !== void 0) {
        if (typeof iat !== "number") {
            throw new TokenVerificationError({
                action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
                reason: "token-verification-failed" /* TokenVerificationFailed */,
                message: `Invalid JWT issued at date claim (iat) ${JSON.stringify(iat)}. Expected number.`
            });
        }
        const issuedAtDate = /* @__PURE__ */ new Date(0);
        issuedAtDate.setUTCSeconds(iat);
        const postIssued = issuedAtDate.getTime() > currentDate.getTime() + clockSkew;
        if (postIssued) {
            throw new TokenVerificationError({
                reason: "token-not-active-yet" /* TokenNotActiveYet */,
                message: `JWT issued at date claim (iat) is in the future. Issued at date: ${issuedAtDate}; Current date: ${currentDate};`
            });
        }
    }
    let signatureValid;
    try {
        signatureValid = await hasValidSignature(decoded, key);
    } catch (err) {
        throw new TokenVerificationError({
            action: "Make sure that this is a valid Clerk generate JWT." /* EnsureClerkJWT */,
            reason: "token-verification-failed" /* TokenVerificationFailed */,
            message: `Error verifying JWT signature. ${err}`
        });
    }
    if (!signatureValid) {
        throw new TokenVerificationError({
            reason: "token-invalid-signature" /* TokenInvalidSignature */,
            message: "JWT signature is invalid."
        });
    }
    return payload;
}

// src/tokens/keys.ts
var cache = {};
var lastUpdatedAt = 0;
function getFromCache(kid) {
    return cache[kid];
}
function setInCache(jwk, jwksCacheTtlInMs = 1e3 * 60 * 60) {
    cache[jwk.kid] = jwk;
    lastUpdatedAt = Date.now();
    if (jwksCacheTtlInMs >= 0) {
        setTimeout(() => {
            if (jwk) {
                delete cache[jwk.kid];
            } else {
                cache = {};
            }
        }, jwksCacheTtlInMs);
    }
}
var LocalJwkKid = "local";
var PEM_HEADER = "-----BEGIN PUBLIC KEY-----";
var PEM_TRAILER = "-----END PUBLIC KEY-----";
var RSA_PREFIX = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA";
var RSA_SUFFIX = "IDAQAB";
function loadClerkJWKFromLocal(localKey) {
    if (!getFromCache(LocalJwkKid)) {
        if (!localKey) {
            throw new TokenVerificationError({
                action: "Set the CLERK_JWT_KEY environment variable." /* SetClerkJWTKey */,
                message: "Missing local JWK.",
                reason: "jwk-local-missing" /* LocalJWKMissing */
            });
        }
        const modulus = localKey.replace(/(\r\n|\n|\r)/gm, "").replace(PEM_HEADER, "").replace(PEM_TRAILER, "").replace(RSA_PREFIX, "").replace(RSA_SUFFIX, "").replace(/\+/g, "-").replace(/\//g, "_");
        setInCache(
            {
                kid: "local",
                kty: "RSA",
                alg: "RS256",
                n: modulus,
                e: "AQAB"
            },
            -1
            // local key never expires in cache
        );
    }
    return getFromCache(LocalJwkKid);
}
async function loadClerkJWKFromRemote({
    apiKey,
    secretKey,
    apiUrl = API_URL,
    apiVersion = API_VERSION,
    issuer,
    kid,
    jwksCacheTtlInMs = 1e3 * 60 * 60,
    // 1 hour,
    skipJwksCache
}) {
    const shouldRefreshCache = !getFromCache(kid) && reachedMaxCacheUpdatedAt();
    if (skipJwksCache || shouldRefreshCache) {
        let fetcher;
        const key = secretKey || apiKey;
        if (key) {
            fetcher = () => fetchJWKSFromBAPI(apiUrl, key, apiVersion);
        } else if (issuer) {
            fetcher = () => fetchJWKSFromFAPI(issuer);
        } else {
            throw new TokenVerificationError({
                action: "Contact support@clerk.com" /* ContactSupport */,
                message: "Failed to load JWKS from Clerk Backend or Frontend API.",
                reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
            });
        }
        const { keys } = await callWithRetry(fetcher);
        if (!keys || !keys.length) {
            throw new TokenVerificationError({
                action: "Contact support@clerk.com" /* ContactSupport */,
                message: "The JWKS endpoint did not contain any signing keys. Contact support@clerk.com.",
                reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
            });
        }
        keys.forEach((key2) => setInCache(key2, jwksCacheTtlInMs));
    }
    const jwk = getFromCache(kid);
    if (!jwk) {
        throw new TokenVerificationError({
            action: "Contact support@clerk.com" /* ContactSupport */,
            message: `Unable to find a signing key in JWKS that matches the kid='${kid}' of the provided session token. Please make sure that the __session cookie or the HTTP authorization header contain a Clerk-generated session JWT.`,
            reason: "jwk-remote-missing" /* RemoteJWKMissing */
        });
    }
    return jwk;
}
async function fetchJWKSFromFAPI(issuer) {
    const url = new URL(issuer);
    url.pathname = joinPaths(url.pathname, ".well-known/jwks.json");
    const response = await runtime_default.fetch(url.href);
    if (!response.ok) {
        throw new TokenVerificationError({
            action: "Contact support@clerk.com" /* ContactSupport */,
            message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
            reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
        });
    }
    return response.json();
}
async function fetchJWKSFromBAPI(apiUrl, key, apiVersion) {
    if (!key) {
        throw new TokenVerificationError({
            action: "Set the CLERK_SECRET_KEY or CLERK_API_KEY environment variable." /* SetClerkSecretKeyOrAPIKey */,
            message: "Missing Clerk Secret Key or API Key. Go to https://dashboard.clerk.com and get your key for your instance.",
            reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
        });
    }
    const url = new URL(apiUrl);
    url.pathname = joinPaths(url.pathname, apiVersion, "/jwks");
    const response = await runtime_default.fetch(url.href, {
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        const json = await response.json();
        const invalidSecretKeyError = getErrorObjectByCode(json?.errors, "clerk_key_invalid" /* InvalidSecretKey */);
        if (invalidSecretKeyError) {
            const reason = "secret-key-invalid" /* InvalidSecretKey */;
            throw new TokenVerificationError({
                action: "Contact support@clerk.com" /* ContactSupport */,
                message: invalidSecretKeyError.message,
                reason
            });
        }
        throw new TokenVerificationError({
            action: "Contact support@clerk.com" /* ContactSupport */,
            message: `Error loading Clerk JWKS from ${url.href} with code=${response.status}`,
            reason: "jwk-remote-failed-to-load" /* RemoteJWKFailedToLoad */
        });
    }
    return response.json();
}
function reachedMaxCacheUpdatedAt() {
    return Date.now() - lastUpdatedAt >= MAX_CACHE_LAST_UPDATED_AT_SECONDS * 1e3;
}

// src/tokens/verify.ts
async function verifyToken(token, options) {
    const {
        apiKey,
        secretKey,
        apiUrl,
        apiVersion,
        audience,
        authorizedParties,
        clockSkewInSeconds,
        clockSkewInMs,
        issuer,
        jwksCacheTtlInMs,
        jwtKey,
        skipJwksCache
    } = options;
    const { header } = decodeJwt(token);
    const { kid } = header;
    let key;
    if (jwtKey) {
        key = loadClerkJWKFromLocal(jwtKey);
    } else if (typeof issuer === "string") {
        key = await loadClerkJWKFromRemote({ issuer, kid, jwksCacheTtlInMs, skipJwksCache });
    } else if (apiKey || secretKey) {
        key = await loadClerkJWKFromRemote({ apiKey, secretKey, apiUrl, apiVersion, kid, jwksCacheTtlInMs, skipJwksCache });
    } else {
        throw new TokenVerificationError({
            action: "Set the CLERK_JWT_KEY environment variable." /* SetClerkJWTKey */,
            message: "Failed to resolve JWK during verification.",
            reason: "jwk-failed-to-resolve" /* JWKFailedToResolve */
        });
    }
    return await verifyJwt(token, {
        audience,
        authorizedParties,
        clockSkewInSeconds,
        clockSkewInMs,
        key,
        issuer
    });
}

// src/tokens/interstitialRule.ts
var shouldRedirectToSatelliteUrl = (qp) => !!qp?.get("__clerk_satellite_url");
var hasJustSynced = (qp) => qp?.get("__clerk_synced") === "true";
var isReturningFromPrimary = (qp) => qp?.get("__clerk_referrer_primary") === "true";
var VALID_USER_AGENTS = /^Mozilla\/|(Amazon CloudFront)/;
var isBrowser = (userAgent) => VALID_USER_AGENTS.test(userAgent || "");
var nonBrowserRequestInDevRule = (options) => {
    const { apiKey, secretKey, userAgent } = options;
    const key = secretKey || apiKey || "";
    if (isDevelopmentFromApiKey(key) && !isBrowser(userAgent)) {
        return signedOut(options, "header-missing-non-browser" /* HeaderMissingNonBrowser */);
    }
    return void 0;
};
var crossOriginRequestWithoutHeader = (options) => {
    const { origin, host, forwardedHost, forwardedProto } = options;
    const isCrossOrigin = origin && checkCrossOrigin({
        originURL: new URL(origin),
        host,
        forwardedHost,
        forwardedProto
    });
    if (isCrossOrigin) {
        return signedOut(options, "header-missing-cors" /* HeaderMissingCORS */);
    }
    return void 0;
};
var isPrimaryInDevAndRedirectsToSatellite = (options) => {
    const { apiKey, secretKey, isSatellite, searchParams } = options;
    const key = secretKey || apiKey || "";
    const isDev = isDevelopmentFromApiKey(key);
    if (isDev && !isSatellite && shouldRedirectToSatelliteUrl(searchParams)) {
        return interstitial(options, "primary-responds-to-syncing" /* PrimaryRespondsToSyncing */);
    }
    return void 0;
};
var potentialFirstLoadInDevWhenUATMissing = (options) => {
    const { apiKey, secretKey, clientUat } = options;
    const key = secretKey || apiKey || "";
    const res = isDevelopmentFromApiKey(key);
    if (res && !clientUat) {
        return interstitial(options, "uat-missing" /* CookieUATMissing */);
    }
    return void 0;
};
var potentialRequestAfterSignInOrOutFromClerkHostedUiInDev = (options) => {
    const { apiKey, secretKey, referrer, host, forwardedHost, forwardedProto } = options;
    const crossOriginReferrer = referrer && checkCrossOrigin({ originURL: new URL(referrer), host, forwardedHost, forwardedProto });
    const key = secretKey || apiKey || "";
    if (isDevelopmentFromApiKey(key) && crossOriginReferrer) {
        return interstitial(options, "cross-origin-referrer" /* CrossOriginReferrer */);
    }
    return void 0;
};
var satelliteInDevReturningFromPrimary = (options) => {
    const { apiKey, secretKey, isSatellite, searchParams } = options;
    const key = secretKey || apiKey || "";
    if (isSatellite && isReturningFromPrimary(searchParams) && isDevelopmentFromApiKey(key)) {
        return interstitial(options, "satellite-returns-from-primary" /* SatelliteReturnsFromPrimary */);
    }
    return void 0;
};
var potentialFirstRequestOnProductionEnvironment = (options) => {
    const { apiKey, secretKey, clientUat, cookieToken } = options;
    const key = secretKey || apiKey || "";
    if (isProductionFromApiKey(key) && !clientUat && !cookieToken) {
        return signedOut(options, "cookie-and-uat-missing" /* CookieAndUATMissing */);
    }
    return void 0;
};
var isNormalSignedOutState = (options) => {
    const { clientUat } = options;
    if (clientUat === "0") {
        return signedOut(options, "standard-signed-out" /* StandardSignedOut */);
    }
    return void 0;
};
var hasPositiveClientUatButCookieIsMissing = (options) => {
    const { clientUat, cookieToken } = options;
    if (clientUat && Number.parseInt(clientUat) > 0 && !cookieToken) {
        return interstitial(options, "cookie-missing" /* CookieMissing */);
    }
    return void 0;
};
var hasValidHeaderToken = async (options) => {
    const { headerToken } = options;
    const sessionClaims = await verifyRequestState(options, headerToken);
    return await signedIn(options, sessionClaims);
};
var hasValidCookieToken = async (options) => {
    const { cookieToken, clientUat } = options;
    const sessionClaims = await verifyRequestState(options, cookieToken);
    const state = await signedIn(options, sessionClaims);
    const jwt = state.toAuth().sessionClaims;
    const cookieTokenIsOutdated = jwt.iat < Number.parseInt(clientUat);
    if (!clientUat || cookieTokenIsOutdated) {
        return interstitial(options, "cookie-outdated" /* CookieOutDated */);
    }
    return state;
};
async function runInterstitialRules(opts, rules) {
    for (const rule of rules) {
        const res = await rule(opts);
        if (res) {
            return res;
        }
    }
    return signedOut(opts, "unexpected-error" /* UnexpectedError */);
}
async function verifyRequestState(options, token) {
    const { isSatellite, proxyUrl } = options;
    let issuer;
    if (isSatellite) {
        issuer = null;
    } else if (proxyUrl) {
        issuer = proxyUrl;
    } else {
        issuer = (iss) => iss.startsWith("https://clerk.") || iss.includes(".clerk.accounts");
    }
    return verifyToken(token, { ...options, issuer });
}
var isSatelliteAndNeedsSyncing = (options) => {
    const { clientUat, isSatellite, searchParams, userAgent } = options;
    const isSignedOut = !clientUat || clientUat === "0";
    if (isSatellite && isSignedOut && !isBrowser(userAgent)) {
        return signedOut(options, "satellite-needs-syncing" /* SatelliteCookieNeedsSyncing */);
    }
    if (isSatellite && isSignedOut && !hasJustSynced(searchParams)) {
        return interstitial(options, "satellite-needs-syncing" /* SatelliteCookieNeedsSyncing */);
    }
    return void 0;
};

// src/tokens/request.ts
function assertSignInUrlExists(signInUrl, key) {
    if (!signInUrl && isDevelopmentFromApiKey(key)) {
        throw new Error(`Missing signInUrl. Pass a signInUrl for dev instances if an app is satellite`);
    }
}
function assertProxyUrlOrDomain(proxyUrlOrDomain) {
    if (!proxyUrlOrDomain) {
        throw new Error(`Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl`);
    }
}
async function authenticateRequest(options) {
    const { cookies, headers, searchParams } = buildRequest2(options?.request);
    options = {
        ...options,
        frontendApi: parsePublishableKey(options.publishableKey)?.frontendApi || options.frontendApi,
        apiUrl: options.apiUrl || API_URL,
        apiVersion: options.apiVersion || API_VERSION,
        headerToken: stripAuthorizationHeader(options.headerToken || headers?.(constants.Headers.Authorization)),
        cookieToken: options.cookieToken || cookies?.(constants.Cookies.Session),
        clientUat: options.clientUat || cookies?.(constants.Cookies.ClientUat),
        origin: options.origin || headers?.(constants.Headers.Origin),
        host: options.host || headers?.(constants.Headers.Host),
        forwardedHost: options.forwardedHost || headers?.(constants.Headers.ForwardedHost),
        forwardedPort: options.forwardedPort || headers?.(constants.Headers.ForwardedPort),
        forwardedProto: options.forwardedProto || headers?.(constants.Headers.ForwardedProto),
        referrer: options.referrer || headers?.(constants.Headers.Referrer),
        userAgent: options.userAgent || headers?.(constants.Headers.UserAgent),
        searchParams: options.searchParams || searchParams || void 0
    };
    assertValidSecretKey(options.secretKey || options.apiKey);
    if (options.isSatellite) {
        assertSignInUrlExists(options.signInUrl, options.secretKey || options.apiKey);
        assertProxyUrlOrDomain(options.proxyUrl || options.domain);
    }
    async function authenticateRequestWithTokenInHeader() {
        try {
            const state = await runInterstitialRules(options, [hasValidHeaderToken]);
            return state;
        } catch (err) {
            return handleError(err, "header");
        }
    }
    async function authenticateRequestWithTokenInCookie() {
        try {
            const state = await runInterstitialRules(options, [
                crossOriginRequestWithoutHeader,
                nonBrowserRequestInDevRule,
                isSatelliteAndNeedsSyncing,
                satelliteInDevReturningFromPrimary,
                isPrimaryInDevAndRedirectsToSatellite,
                potentialFirstRequestOnProductionEnvironment,
                potentialFirstLoadInDevWhenUATMissing,
                potentialRequestAfterSignInOrOutFromClerkHostedUiInDev,
                hasPositiveClientUatButCookieIsMissing,
                isNormalSignedOutState,
                hasValidCookieToken
            ]);
            return state;
        } catch (err) {
            return handleError(err, "cookie");
        }
    }
    function handleError(err, tokenCarrier) {
        if (err instanceof TokenVerificationError) {
            err.tokenCarrier = tokenCarrier;
            const reasonToReturnInterstitial = [
                "token-expired" /* TokenExpired */,
                "token-not-active-yet" /* TokenNotActiveYet */
            ].includes(err.reason);
            if (reasonToReturnInterstitial) {
                if (tokenCarrier === "header") {
                    return unknownState(options, err.reason, err.getFullMessage());
                }
                return interstitial(options, err.reason, err.getFullMessage());
            }
            return signedOut(options, err.reason, err.getFullMessage());
        }
        return signedOut(options, "unexpected-error" /* UnexpectedError */, err.message);
    }
    if (options.headerToken) {
        return authenticateRequestWithTokenInHeader();
    }
    return authenticateRequestWithTokenInCookie();
}
var debugRequestState = (params) => {
    const { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain } = params;
    return { frontendApi, isSignedIn, proxyUrl, isInterstitial, reason, message, publishableKey, isSatellite, domain };
};

// src/tokens/factory.ts
function createAuthenticateRequest(params) {
    const { apiClient } = params;
    const {
        apiKey: buildtimeApiKey = "",
        secretKey: buildtimeSecretKey = "",
        jwtKey: buildtimeJwtKey = "",
        apiUrl = API_URL,
        apiVersion = API_VERSION,
        frontendApi: buildtimeFrontendApi = "",
        proxyUrl: buildProxyUrl = "",
        publishableKey: buildtimePublishableKey = "",
        isSatellite: buildtimeIsSatellite = false,
        domain: buildtimeDomain = "",
        audience: buildtimeAudience = ""
    } = params.options;
    const authenticateRequest2 = ({
        apiKey: runtimeApiKey,
        secretKey: runtimeSecretKey,
        audience: runtimeAudience,
        frontendApi: runtimeFrontendApi,
        proxyUrl: runtimeProxyUrl,
        publishableKey: runtimePublishableKey,
        jwtKey: runtimeJwtKey,
        isSatellite: runtimeIsSatellite,
        domain: runtimeDomain,
        searchParams,
        ...rest
    }) => {
        return authenticateRequest({
            ...rest,
            apiKey: runtimeApiKey || buildtimeApiKey,
            secretKey: runtimeSecretKey || buildtimeSecretKey,
            audience: runtimeAudience || buildtimeAudience,
            apiUrl,
            apiVersion,
            frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
            proxyUrl: runtimeProxyUrl || buildProxyUrl,
            publishableKey: runtimePublishableKey || buildtimePublishableKey,
            isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
            domain: runtimeDomain || buildtimeDomain,
            jwtKey: runtimeJwtKey || buildtimeJwtKey,
            searchParams
        });
    };
    const localInterstitial = ({
        frontendApi: runtimeFrontendApi,
        publishableKey: runtimePublishableKey,
        proxyUrl: runtimeProxyUrl,
        isSatellite: runtimeIsSatellite,
        domain: runtimeDomain,
        ...rest
    }) => loadInterstitialFromLocal({
        ...rest,
        frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
        proxyUrl: runtimeProxyUrl || buildProxyUrl,
        publishableKey: runtimePublishableKey || buildtimePublishableKey,
        isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
        domain: runtimeDomain || buildtimeDomain
    });
    const remotePublicInterstitial = ({
        frontendApi: runtimeFrontendApi,
        publishableKey: runtimePublishableKey,
        proxyUrl: runtimeProxyUrl,
        isSatellite: runtimeIsSatellite,
        domain: runtimeDomain,
        ...rest
    }) => {
        return loadInterstitialFromBAPI({
            ...rest,
            apiUrl,
            frontendApi: runtimeFrontendApi || buildtimeFrontendApi,
            publishableKey: runtimePublishableKey || buildtimePublishableKey,
            proxyUrl: runtimeProxyUrl || buildProxyUrl,
            isSatellite: runtimeIsSatellite || buildtimeIsSatellite,
            domain: runtimeDomain || buildtimeDomain
        });
    };
    const remotePublicInterstitialUrl = buildPublicInterstitialUrl;
    const remotePrivateInterstitial = () => apiClient.interstitial.getInterstitial();
    return {
        authenticateRequest: authenticateRequest2,
        localInterstitial,
        remotePublicInterstitial,
        remotePrivateInterstitial,
        remotePublicInterstitialUrl,
        debugRequestState
    };
}

// src/redirections.ts
var buildUrl = (targetUrl, redirectUrl) => {
    let url;
    if (!targetUrl.startsWith("http")) {
        if (!redirectUrl || !redirectUrl.startsWith("http")) {
            throw new Error("destination url or return back url should be an absolute path url!");
        }
        const baseURL = new URL(redirectUrl);
        url = new URL(targetUrl, baseURL.origin);
    } else {
        url = new URL(targetUrl);
    }
    if (redirectUrl) {
        url.searchParams.set("redirect_url", redirectUrl);
    }
    return url.toString();
};
var missingPublishableKeyErrorMessage = `Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.`;
function redirect({ redirectAdapter, signUpUrl, signInUrl, frontendApi, publishableKey }) {
    if (!frontendApi) {
        frontendApi = parsePublishableKey(publishableKey)?.frontendApi;
    }
    const accountsBaseUrl = buildAccountsBaseUrl(frontendApi);
    const redirectToSignUp = ({ returnBackUrl } = {}) => {
        if (!signUpUrl && !accountsBaseUrl) {
            throw new Error(missingPublishableKeyErrorMessage);
        }
        const accountsSignUpUrl = `${accountsBaseUrl}/sign-up`;
        return redirectAdapter(buildUrl(signUpUrl || accountsSignUpUrl, returnBackUrl));
    };
    const redirectToSignIn = ({ returnBackUrl } = {}) => {
        if (!signInUrl && !accountsBaseUrl) {
            throw new Error(missingPublishableKeyErrorMessage);
        }
        const accountsSignInUrl = `${accountsBaseUrl}/sign-in`;
        return redirectAdapter(buildUrl(signInUrl || accountsSignInUrl, returnBackUrl));
    };
    return { redirectToSignUp, redirectToSignIn };
}
function buildAccountsBaseUrl(frontendApi) {
    if (!frontendApi) {
        return "";
    }
    const accountsBaseUrl = frontendApi.replace(/(clerk\.accountsstage\.)/, "accountsstage.").replace(/(clerk\.accounts\.|clerk\.)/, "accounts.");
    return `https://${accountsBaseUrl}`;
}

// src/index.ts
function Clerk(options) {
    const opts = { ...options };
    const apiClient = createBackendApiClient(opts);
    const requestState = createAuthenticateRequest({ options: opts, apiClient });
    return {
        ...apiClient,
        ...requestState,
        /**
         * @deprecated This prop has been deprecated and will be removed in the next major release.
         */
        __unstable_options: opts
    };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    AllowlistIdentifier,
    AuthStatus,
    Clerk,
    Client,
    DeletedObject,
    Email,
    EmailAddress,
    ExternalAccount,
    IdentificationLink,
    Invitation,
    OauthAccessToken,
    ObjectType,
    Organization,
    OrganizationInvitation,
    OrganizationMembership,
    OrganizationMembershipPublicUserData,
    PhoneNumber,
    RedirectUrl,
    SMSMessage,
    Session,
    SignInToken,
    Token,
    User,
    Verification,
    buildRequestUrl,
    constants,
    createAuthenticateRequest,
    createIsomorphicRequest,
    debugRequestState,
    decodeJwt,
    deserialize,
    hasValidSignature,
    loadInterstitialFromLocal,
    makeAuthObjectSerializable,
    prunePrivateMetadata,
    redirect,
    sanitizeAuthObject,
    signedInAuthObject,
    signedOutAuthObject,
    verifyJwt,
    verifyToken
});
//# sourceMappingURL=index.js.map