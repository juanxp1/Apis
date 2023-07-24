export declare class TokenEntity {
    token_type: string;
    access_token: string;
    expires_in: number;
    scope: string;
    constructor(token_type: string, access_token: string, expires_in: number, scope: string);
}
