"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenEntity = void 0;
class TokenEntity {
    constructor(token_type, access_token, expires_in, scope) {
        this.token_type = token_type;
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.scope = scope;
    }
}
exports.TokenEntity = TokenEntity;
//# sourceMappingURL=tokendav.entity.js.map