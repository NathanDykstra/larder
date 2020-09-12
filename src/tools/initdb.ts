import dotenv from "dotenv";
import { logger } from "../util/logger";
import * as fs from 'fs';
import * as cliProgress from 'cli-progress';

dotenv.config();
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Initialize the database by creating tables.
 * THIS WILL DROP ANY EXISTING TABLES.
 * This should only be performed on initial setup.
 */
const init = async () => {
    try {
        // read the contents of the initdb sql file
        const sql = fs.readFileSync( "./tools/initdb.sql", "utf8");

        // split the file into separate statements
        const statements = sql.split( /;\s*$/m );
        progressBar.start(statements.length - 1, 0);
        for ( const statement of statements ) {

            // tslint:disable-next-line: no-magic-numbers
            if ( statement.length > 3 ) {
                // execute each of the statements
                // tslint:disable-next-line: no-magic-numbers
                await sleep(1000);
                progressBar.increment();
            }
        }
    } catch ( err ) {
        logger.error( err );
        throw err;
    } finally {
        progressBar.stop();
        logger.info("Database initialization complete");
    }
};

init();