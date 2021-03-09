import express from "express";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const dashboardRouter = express.Router();

    dashboardRouter.get("/student", authChecker, (req, res) => {
        // Show dashboard page
        res.render("studentDashboard");
    });

    dashboardRouter.get("/staff", authChecker, (req, res) => {
        // Show dashboard page
        res.render("staffDashboard");
    });

    return dashboardRouter;
};

export default handler;
