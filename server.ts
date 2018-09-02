import * as express from "express";
import mongoose = require('mongoose');
import * as bodyParser from "body-parser";
import * as logger from 'morgan';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/graphql-resolver/userResolver";
import * as graphqlHTTP from "express-graphql";
import { createConnection } from "typeorm";
import { UserModel } from "./src/models/userModel";
import PassportCustom from './src/utility/passport';
const ormconfig = require("./ormconfig.json");
import * as passport from 'passport';

var config = require('./config.json');
var port = process.env.PORT || config.express_port;

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

        // questo fa funzionare passport.autenticate
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

        const schema = await buildSchema({
            resolvers: [UserResolver]
        });

        this.express.use('/api',
            passport.authenticate('jwt',
                {
                    session: false
                }),
            graphqlHTTP((req) => ({
                schema: schema,
                graphiql: true,
                context: req.user
            })));

        // DEBUG ONLY
        this.express.use('/graphql',
            graphqlHTTP((req) => ({
                schema: schema,
                graphiql: true,
                context: req.user,
                req: req
            })));
    }
}

export default new App().express;