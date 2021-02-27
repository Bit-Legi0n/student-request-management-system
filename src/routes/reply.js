import express from "express";
import { authChecker } from "../util/middleware";
import {
    saveReply,
    getUser,
    setRequestStatus,
    getRequest,
} from "../util/database";
import Reply from "../models/reply";
import { v4 as uuidv4 } from "uuid";

const handler = (pool) => {
    const replyRouter = express.Router();

    replyRouter.post("/:requestId", authChecker, async (req, res) => {
        const reqId = req.params.requestId;
        const userId = req.session.user.userId;
        const { datetime, body } = req.body;
        const reply = Reply(uuidv4(), reqId, userId, datetime, body);

        const request = await getRequest(pool, reqId);
        // Check if there exists a req with the given id
        if (request) {
            //  Check whether the user is saving a reply related to a request submitted by him
            if (userId == request.student_id || userId == request.staff_id) {
                await saveReply(pool, reply);
                res.redirect("/request/" + reqId);
            } else {
                res.redirect("/dashboard");
            }
        } else {
            res.redirect("/dashboard");
        }
    });

    replyRouter.post("/:requestId/status", authChecker, async (req, res) => {
        // Update status of request
        // Check whether the corresponding staff member
        const reqId = req.params.requestId;
        const userId = req.session.user.userId;

        const user = await getUser(pool, userId);
        if (user.type == "staff") {
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
