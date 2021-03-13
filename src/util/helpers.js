// Create session cookie
export const sessionizeUser = (user) => {
    return { userId: user.id };
};
