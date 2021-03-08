import express from "express";
import { sessionChecker } from "../util/middleware";
import { sessionizeUser } from "../util/helpers";
import {getUserById} from "../util/database";
import User from "../models/user";

const handler = (pool) => {
    const loginRouter = express.Router();

    // Get request for login page
    loginRouter.get("", sessionChecker, (req, res) => {
        // Show login page
        res.render("login");
    });

    // Post request for login
    loginRouter.post("", sessionChecker, async(req, res) => {
        
        const {username , password} = req.body;

        const user = await getUserById(pool,username);

        if(!user) {
            res.redirect('/login');
        } else if(!user.validPassword(password)){
            res.redirect('/login');
        }else {
            req.session.user = sessionizeUser(user);
            res.redirect('/dashboard');
        }

    });

    return loginRouter;
};

export default handler;
