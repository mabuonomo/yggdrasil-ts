import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from 'morgan';
import { buildSchema } from "type-graphql";

// graphql resolvers
import { UserResolver } from "./src/graphql-resolver/userResolver";
import { SignResolver } from "./src/graphql-resolver/signResolver";
import { SocialResolver } from "./src/graphql-resolver/socialResolver";

import * as graphqlHTTP from "express-graphql";
import { createConnection, ConnectionOptions } from "typeorm";
import PassportCustom from './src/utility/passport';
import * as passport from 'passport';

import * as config from './config';
const port = process.env.PORT || config.Config.EXPRESS_PORT;

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.initDatabase();

        this.express = express();

        this.middleware();
        this.setRouter();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());

        // need to use passport.autenticate
        this.express.use(bodyParser.urlencoded({ extended: false }));

        this.express.use(bodyParser.text({ type: 'application/graphql' }));
        this.express.listen(port);

        PassportCustom.init(this.express);
    }

    private initDatabase() {
        createConnection(config.Config.DB_CONNECTION);
    }

    private async setRouter() {

        const schemaSign = await buildSchema({
            resolvers: [SignResolver, SocialResolver]
        });

        this.express.use('/sign',
            graphqlHTTP((req, res, next) => ({
                schema: schemaSign,
                graphiql: true,
                req: req,
                res: res,
                next: next
            })));

        const schemaApi = await buildSchema({
            resolvers: [UserResolver]
        });

        this.express.use('/api',
            passport.authenticate('jwt',
                {
                    session: false
                }),
            graphqlHTTP((req) => ({
                schema: schemaApi,
                graphiql: true,
                context: req.user
            })));
    }
}

export default new App().express;