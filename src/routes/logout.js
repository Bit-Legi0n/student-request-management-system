import express from "express";

const handler = (pool) => {
    const logoutRouter = express.Router();

    // Get request for logout
    // Path: /
    logoutRouter.get("", ({ session }, res) => {
        // Logout user
    });

    return logoutRouter;
};

export default handler;
