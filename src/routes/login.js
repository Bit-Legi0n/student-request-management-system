import express from "express";
import { sessionChecker } from "../util/middleware";
import { sessionizeUser } from "../util/helpers";
import { getUserById } from "../util/database";

const handler = (pool) => {
    const loginRouter = express.Router();

    // Get request for login page
    loginRouter.get("", sessionChecker, (req, res) => {
        // Show login page
        res.render("login", { invalidLogin: req.query.invalid });
    });

    // Post request for login
    loginRouter.post("", sessionChecker, async (req, res) => {
        const { userId, password } = req.body;

        const user = await getUserById(pool, userId);

        if (!user || !user.validPassword(password)) {
            res.redirect("/login?invalid=true");
        } else {
            req.session.user = sessionizeUser(user);
            res.redirect("/dashboard");
        }
    });

    return loginRouter;
};

export default handler;
