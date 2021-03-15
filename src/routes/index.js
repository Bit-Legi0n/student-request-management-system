import loginRouter from "./login";
import logoutRouter from "./logout";
import dashboardRouter from "./dashboard";
import requestRouter from "./request";
import replyRouter from "./reply";

const handler = (pool, io) => {
    return {
        loginRouter: loginRouter(pool),
        logoutRouter: logoutRouter(pool),
        dashboardRouter: dashboardRouter(pool),
        requestRouter: requestRouter(pool, io),
        replyRouter: replyRouter(pool),
    };
};

export default handler;
