import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import * as routes from '@routes/index';
import { logger } from '@util/logger';
import path from 'path';
import { connectDatabase } from '@data/connection';
import bodyParser from 'body-parser';
import "reflect-metadata";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

// review pug syntax: https://pugjs.org/api/getting-started.html
app.set('views', path.join( __dirname, 'views' ));
app.set('view engine', 'pug');

// configure all the routes
routes.register(app);

connectDatabase();

// start the Express server
export const server = app.listen(port, () => {
    logger.info(`server started at http://localhost:${ port }`);
});
