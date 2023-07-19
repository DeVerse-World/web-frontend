export function isAdminUser(user) {
    return user && user.social_email === "shared@cosugames.com";
}