import express from "express";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const dashboardRouter = express.Router();

    dashboardRouter.get("", authChecker, (req, res) => {
        // Show dashboard page
    });

    return dashboardRouter;
};

export default handler;
