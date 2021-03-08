import express from "express";
import { v4 as uuidv4 } from "uuid";
import RequestModel from "../models/request";
import { getRepliesForRequest, getRequest, saveRequest } from "../util/database";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const requestRouter = express.Router();

    requestRouter.get("/:requestId", authChecker, async (req, res) => {
        // Show request page
        const { requestId } = req.params;
        const { userId } = req.session.user;

        const request = await getRequest(pool, requestId);

        if (request) {
            if (userId === request.student_id || userId === request.staff_id) {
                const replies = await getRepliesForRequest(pool, requestId);
                res.render("request", {
                    request,
                    replies,
                });
            } else {
                res.redirect("/dashboard");
            }
        } else {
            res.redirect("/dashboard");
        }
    });

    requestRouter.post("", authChecker, async (req, res) => {
        // Save request
        const { staff_id, type, body } = req.body;
        const student_id = req.session.user.userId;

        const request = RequestModel(
            uuidv4(),
            student_id,
            staff_id,
            new Date(),
            "pending",
            type,
            body
        );

        await saveRequest(pool, request);
        res.redirect(`/request/${request.id}`);
    });

    return requestRouter;
};

export default handler;
