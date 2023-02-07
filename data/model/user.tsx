export type User = {
    created_at: string;
    custom_email: string;
    id: number;
    name: string;
    social_email: string;
    updated_at: string;
    wallet_address: string;
    wallet_nonce: string;

    isBlogPostAdmin: boolean;
    avatar?: string;
}

export type GoogleUser = {
    id: string;
    locale: string;
    email: string;
    verified_email: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
}

export enum UserType {
    GOOGLE, METAMASK, EMAIL_PASSWORD
}