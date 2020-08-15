import * as express from "express";

export const register = ( app: express.Application ) => {
    app.get( "/", ( req, res ) => {
        res.send( "Hello world!" );
    });
};