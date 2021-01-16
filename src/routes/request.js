import express from "express";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const requestRouter = express.Router();

    requestRouter.get("/:requestId", authChecker, (req, res) => {
        // Show request page
    });

    requestRouter.post("", authChecker, (req, res) => {
        // Save request
    });

    return requestRouter;
};

export default handler;
