export type User = {
    id: string;
    avatar?: string;
    name: string;
    // dob: string;
    email?: string;
    userType: UserType;
    walletAddress?: string;
}

export enum UserType {
    GOOGLE, METAMASK, EMAIL_PASSWORD
}