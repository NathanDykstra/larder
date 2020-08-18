import express from "express";
import dotenv from "dotenv";
import * as routes from "../routes/index";
import { logger } from "../util/logger";
import * as mysql from "mysql";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

// Configure the database connection
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

/**
 * Connect to the MySQL database.
 */
con.connect((err) => {
    if (err) {
        throw err;
    }

   logger.info('Database connected');
});

// configure all the routes
routes.register( app );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    logger.info( `server started at http://localhost:${ port }` );
} );