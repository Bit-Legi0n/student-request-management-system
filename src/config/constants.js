require("dotenv").config();

export const {
    PORT,
    NODE_ENV,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
} = process.env;
