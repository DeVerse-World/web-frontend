export type User = {
    created_at: string;
    custom_email: string;
    id: number;
    name: string;
    social_email: string;
    updated_at: string;
    wallet_address: string;
    wallet_nonce: string;

    avatar?: string;
}

export type GoogleUser = {
    email: string;
    token_id: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    hd: string;
    name: string;
    picture: string;
    sub: string;
    jti: string;
    iss: string;
    exp: number;
    iat: number;
    nbf: number;
}

export enum UserType {
    GOOGLE, METAMASK, EMAIL_PASSWORD
}