// If session available, redirect to dashboard
// Used for login route
export const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

// If session unavailable, redirect to login
// Used for all protected routes
export const authChecker = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};
