// Create session cookie
export const sessionizeUser = (user) => {
    return { userID: user.id };
};
