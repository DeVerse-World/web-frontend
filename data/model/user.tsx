export type User = {
    id: string;
    avatar?: string;
    name: string;
    // dob: string;
    email?: string;
    userType: UserType;
    walletAddress?: string;
}

export type GoogleUser = {
    email: string;
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