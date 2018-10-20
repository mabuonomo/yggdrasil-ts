import { ConnectionOptions } from "typeorm";

export class Config {

    // express
    static readonly EXPRESS_PORT: number = 3000;

    static readonly FACEBOOK_FIELDS :string= "me?fields=id,name,email,birthday,first_name,last_name";

    // typeorm
    static readonly ORMCONFIG_TYPE: "mongodb" = 'mongodb';
    static readonly ORMCONFIG_HOST: string = 'mongo';
    static readonly ORMCONFIG_PORT: number = 27017;
    static readonly ORMCONFIG_USERNAME: string = '';
    static readonly ORMCONFIG_PASSWORD: string = '';
    static readonly ORMCONFIG_DATABASE: string = 'yggdrasil';
    static readonly ORMCONFIG_DATABASE_TEST: string = 'yggdrasil_test';
    static readonly ORMCONFIG_SYNCRONIZE: boolean = true;
    static readonly ORMCONFIG_LOGGING: boolean = false;

    static readonly DB_CONNECTION: ConnectionOptions = {
        type: Config.ORMCONFIG_TYPE,
        host: Config.ORMCONFIG_HOST,
        port: Config.ORMCONFIG_PORT,
        username: Config.ORMCONFIG_USERNAME,
        password: Config.ORMCONFIG_PASSWORD,
        database: Config.ORMCONFIG_DATABASE,
        entities: [
            __dirname + "/src/models/*.js"
        ],
        synchronize: Config.ORMCONFIG_SYNCRONIZE,
        logging: Config.ORMCONFIG_LOGGING
    }

    static readonly DB_CONNECTION_TEST: ConnectionOptions = {
        type: Config.ORMCONFIG_TYPE,
        host: Config.ORMCONFIG_HOST,
        port: Config.ORMCONFIG_PORT,
        username: Config.ORMCONFIG_USERNAME,
        password: Config.ORMCONFIG_PASSWORD,
        database: Config.ORMCONFIG_DATABASE_TEST,
        entities: [
            __dirname + "/src/models/*.js"
        ],
        synchronize: Config.ORMCONFIG_SYNCRONIZE,
        logging: Config.ORMCONFIG_LOGGING
    }
}