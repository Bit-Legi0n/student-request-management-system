import express from "express";
import { authChecker } from "../util/middleware";
import {
    getUserById,
    getRequestsForStaff,
    getRequestsForStudent,
} from "../util/database";

const handler = (pool) => {
    const dashboardRouter = express.Router();

    dashboardRouter.get("", authChecker, async (req, res) => {
        // Show dashboard page
        const { userId } = req.session.user;

        const user = await getUserById(pool, userId);

        if (user.isStaff()) {
            const requests = await getRequestsForStaff(pool, userId);
            res.render("staffDashboard", {
                requests,
                user,
            });
        } else {
            const requests = await getRequestsForStudent(pool, userId);
            res.render("studentDashboard", {
                requests,
                user,
            });
        }
    });

    return dashboardRouter;
};

export default handler;
