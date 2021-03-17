import express from "express";
import { v4 as uuidv4 } from "uuid";
import upload from "../config/storage";
import {
    getRepliesForRequest,
    getRequest,
    getUserById,
    saveRequest,
} from "../util/database";
import { authChecker } from "../util/middleware";

const handler = (pool, io) => {
    const requestRouter = express.Router();

    requestRouter.get("/:requestId", authChecker, async (req, res) => {
        // Show request page
        const { requestId } = req.params;
        const { userId } = req.session.user;
        const user = await getUserById(pool, userId);

        const request = await getRequest(pool, requestId);

        if (request) {
            if (userId === request.student_id || userId === request.staff_id) {
                // Socket.io
                io.once("connection", (socket) => {
                    socket.once("disconnect", () => {
                        console.log("user disconnected from socket");
                    });
                    socket.once("join", async (room) => {
                        const roomRequest = await getRequest(pool, room);
                        const socketUser = await getUserById(
                            pool,
                            socket.handshake.session.user.userId
                        );
                        if (
                            socketUser.id === roomRequest.staff_id ||
                            socketUser.id === roomRequest.student_id
                        ) {
                            socket.join(room);
                        }
                    });
                    socket.on("reply", (newReply) => {
                        socket.to(requestId).emit("reply", newReply);
                    });
                });

                // Response
                const replies = await getRepliesForRequest(pool, requestId);
                res.render("request", {
                    request,
                    replies,
                    user,
                });
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
        }
    });

    requestRouter.post("", authChecker, upload.any(), async (req, res) => {
        // Save request
        const { staff_name, type, body } = req.body;
        const student_id = req.session.user.userId;

        const request = {
            id: uuidv4(),
            student_id,
            staff_name,
            datetime: new Date(),
            status: "pending",
            type,
            body,
            filepath:
                req.files && req.files.length
                    ? req.files[0].filename
                    : undefined,
        };

        try {
            await saveRequest(pool, request);
            res.redirect(`/request/${request.id}`);
        } catch (err) {
            console.log(err);
            res.redirect("/dashboard");
        }
    });

    return requestRouter;
};

export default handler;
