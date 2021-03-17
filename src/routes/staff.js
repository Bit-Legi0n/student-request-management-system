import express from "express";
import { authChecker } from "../util/middleware";
import { getStaffNames } from "../util/database";

const handler = (pool) => {
    const staffRouter = express.Router();

    staffRouter.get("", authChecker, async (req, res) => {
        // Get staff member names
        const { name } = req.query;

        const results = await getStaffNames(pool, name);

        const staffNames = results.map((value) => {
            return value.name;
        });
        res.send(staffNames);
    });

    return staffRouter;
};

export default handler;
