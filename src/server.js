import express from "express";
import path from "path";
import createError from "http-errors";
import logger from "morgan";
import session from "express-session";
import expressMySqlSession from "express-mysql-session";
import mysql from "mysql";
import {
    PORT,
    NODE_ENV,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
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
app.use(logger("dev"));

// Session store
const MySQLStore = expressMySqlSession(session);
const sessionStore = new MySQLStore(
    { clearExpired: true, checkExpirationInterval: 600000, ...MySQLOptions },
    pool
);
app.use(
    session({
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
    })
);

// Check session
app.use((req, res, next) => {
    if (!req.session.user) {
        res.clearCookie(SESS_NAME);
    }
    next();
});

// Routing
const {
    loginRouter,
    logoutRouter,
    dashboardRouter,
    requestRouter,
    replyRouter,
} = router(pool);

app.use("/", (req, res) => {
    // Default route
    res.redirect("/dashboard");
});
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/dashboard", dashboardRouter);
app.use("/request", requestRouter);
app.use("/reply", replyRouter);

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

// Start server
app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));
