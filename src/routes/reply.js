import express from "express";
import { v4 as uuidv4 } from "uuid";
import upload from "../config/storage";
import Reply from "../models/reply";
import {
    getRequest,
    getUserById,
    saveReply,
    setRequestStatus,
} from "../util/database";
import { authChecker } from "../util/middleware";

const handler = (pool) => {
    const replyRouter = express.Router();

    replyRouter.post(
        "/:requestId",
        authChecker,
        upload.any(),
        async (req, res) => {
            const reqId = req.params.requestId;
            const userId = req.session.user.userId;
            const { body } = req.body;
            const reply = new Reply(
                uuidv4(),
                reqId,
                userId,
                new Date(),
                body,
                req.files && req.files.length
                    ? req.files[0].filename
                    : undefined
            );

            const request = await getRequest(pool, reqId);
            // Check if there exists a req with the given id
            if (request) {
                // Check whether the user is saving a reply related to a request submitted by him
                if (
                    userId == request.student_id ||
                    userId == request.staff_id
                ) {
                    await saveReply(pool, reply);
                    res.send(reply);
                } else {
                    res.redirect("/dashboard");
                }
            } else {
                res.redirect("/dashboard");
            }
        }
    );

    replyRouter.post("/:requestId/status", authChecker, async (req, res) => {
        // Update status of request
        // Check whether the corresponding staff member
        const reqId = req.params.requestId;
        const userId = req.session.user.userId;

        const user = await getUserById(pool, userId);
        if (user.isStaff()) {
            const request = await getRequest(pool, reqId);
            if (request && request.staff_id == userId) {
                await setRequestStatus(pool, reqId, req.body.reqStatus);
                res.redirect("/request/" + reqId);
            } else {
                res.redirect("/dashboard");
            }
        } else {
            res.redirect("/dashboard");
        }
    });

    return replyRouter;
};

export default handler;
