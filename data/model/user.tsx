export type User = {
    id: string;
    avatar?: string;
    name: string;
    // dob: string;
    email?: string;
    userType: UserType
}

export enum UserType {
    GOOGLE, METAMASK, EMAIL_PASSWORD
}