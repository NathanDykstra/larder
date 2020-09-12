import express from 'express';
import dotenv from 'dotenv';
import * as routes from './routes/index';
import { logger } from './util/logger';
import path from 'path';
import { connectDatabase } from './data/connection';
import bodyParser from 'body-parser';

dotenv.config();
connectDatabase();

// mostly taken from https://developer.okta.com/blog/2018/11/15/node-express-typescript

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

// review pug syntax: https://pugjs.org/api/getting-started.html
app.set('views', path.join( __dirname, 'views' ));
app.set('view engine', 'pug');

// configure all the routes
routes.register(app);

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    logger.info( `server started at http://localhost:${ port }` );
} );