import cookieParser from "cookie-parser";
import express from "express";
import expressMySqlSession from "express-mysql-session";
import expressSession from "express-session";
import createError from "http-errors";
import logger from "morgan";
import mysql from "mysql";
import path from "path";
import socketio from "socket.io";
import {
    MYSQL_DATABASE,
    MYSQL_HOST,
    MYSQL_PASSWORD,
    MYSQL_USER,
    NODE_ENV,
    PORT,
    SESS_LIFETIME,
    SESS_NAME,
    SESS_SECRET,
} from "./config/constants";
import router from "./routes/index";

// MySQL database
const MySQLOptions = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
};
const pool = mysql.createPool({ connectionLimit: 10, ...MySQLOptions });
pool.getConnection((err, conn) => {
    if (err) throw err;

    // Check connection
    console.log("Connected to MySQL database");
    conn.release();
});

// Express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Options
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(logger("dev"));

// Session store
const MySQLStore = expressMySqlSession(expressSession);
const sessionStore = new MySQLStore(
    { clearExpired: true, checkExpirationInterval: 600000, ...MySQLOptions },
    pool
);
const session = expressSession({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
        sameSite: true,
        secure: NODE_ENV === "production",
        maxAge: parseInt(SESS_LIFETIME),
    },
});
app.use(session);

// Check session
app.use((req, res, next) => {
    if (!req.session.user) {
        res.clearCookie(SESS_NAME);
    }
    next();
});

// Start server
const io = socketio(
    app.listen(PORT, () =>
        console.log(`App running at http://localhost:${PORT}`)
    )
);

io.use((socket, next) => {
    let req = socket.handshake;
    let res = socket.request.res || {};
    cookieParser()(req, res, (err) => {
        if (err) return next(err);
        session(req, res, next);
    });
});

// Routing
const {
    loginRouter,
    logoutRouter,
    dashboardRouter,
    requestRouter,
    replyRouter,
} = router(pool, io);

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/dashboard", dashboardRouter);
app.use("/request", requestRouter);
app.use("/reply", replyRouter);
app.use("/", (req, res, next) => {
    // Handle base route
    if (req.url === "/") {
        res.redirect("/dashboard");
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
