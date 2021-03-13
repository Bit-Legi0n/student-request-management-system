import express from "express";
import { authChecker } from "../util/middleware";
import { getUserById, getRequestsForUser } from "../util/database";

const handler = (pool) => {
    const dashboardRouter = express.Router();

    dashboardRouter.get("", authChecker, async (req, res) => {
        // Show dashboard page
        const { userId } = req.session.user;

        const user = await getUserById(pool, userId);

        const requests = await getRequestsForUser(pool, userId);

        if (user.isStaff()) {
            res.render("staffDashboard", {
                requests,
            });
        } else {
            res.render("studentDashboard", {
                requests,
            });
        }
    });

    return dashboardRouter;
};

export default handler;
