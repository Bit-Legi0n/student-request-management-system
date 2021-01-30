import express from "express";
import { sessionChecker } from "../util/middleware";
import { sessionizeUser } from "../util/helpers";

const handler = (pool) => {
    const loginRouter = express.Router();

    // Get request for login page
    loginRouter.get("", sessionChecker, (req, res) => {
        // Show login page
        res.render("login");
    });

    // Post request for login
    loginRouter.post("", sessionChecker, (req, res) => {
        // Login user
        // Save session
    });

    return loginRouter;
};

export default handler;
