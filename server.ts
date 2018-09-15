import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from 'morgan';
import { buildSchema } from "type-graphql";

// graphql resolvers
import { UserResolver } from "./src/graphql-resolver/userResolver";
import { SignResolver } from "./src/graphql-resolver/signResolver";

import * as graphqlHTTP from "express-graphql";
import { createConnection } from "typeorm";
import { UserModel } from "./src/models/userModel";
import PassportCustom from './src/utility/passport';
import * as passport from 'passport';

const config = require('./config.json');
const port = process.env.PORT || config.express_port;
const ormconfig = require("./ormconfig.json");

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();

        this.middleware();
        this.initDatabase();
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

        createConnection({
            type: ormconfig.type,
            host: ormconfig.host,
            port: ormconfig.port,
            username: ormconfig.username,
            password: ormconfig.password,
            database: ormconfig.database,
            entities: [
                UserModel
            ],
            synchronize: true,
            logging: true
        }).then(connection => {
            // here you can start to work with your entities
        }).catch(error => console.log(error));
    }

    private async setRouter() {

        const schemaSign = await buildSchema({
            resolvers: [SignResolver]
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