import express from "express";
import { SESS_NAME } from "../config/constants";

const handler = (pool) => {
    const logoutRouter = express.Router();

    // Get request for logout
    // Path: /
    logoutRouter.get("", ({ session }, res) => {
        try {
            const user = session.user;
            if (user) {
                session.destroy((err) => {
                    if (err) throw err;

                    res.clearCookie(SESS_NAME);
                    res.redirect("/login");
                });
            } else {
                res.redirect("/login");
            }
        } catch (err) {
            res.redirect("/login");
        }
    });

    return logoutRouter;
};

export default handler;
