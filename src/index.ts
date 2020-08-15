import express from "express";
import dotenv from "dotenv";
import * as routes from "../routes/index";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

routes.register( app );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );