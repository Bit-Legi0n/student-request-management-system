import express from "express";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const replyRouter = express.Router();

    replyRouter.post("/:requestId", authChecker, (req, res) => {
        // Save reply for request
    });

    replyRouter.post("/:requestId/status", authChecker, (req, res) => {
        // Update status of request
    });

    return replyRouter;
};

export default handler;
