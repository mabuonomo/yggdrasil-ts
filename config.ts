export class Config {

    // express
    static EXPRESS_PORT: number = 3000;

    // typeorm
    static ORMCONFIG_TYPE: "mongodb" = 'mongodb';
    static ORMCONFIG_HOST: string = 'mongo';
    static ORMCONFIG_PORT: number = 27017;
    static ORMCONFIG_USERNAME: string = '';
    static ORMCONFIG_PASSWORD: string = '';
    static ORMCONFIG_DATABASE: string = 'yggdrasil';
    static ORMCONFIG_TEST_DATABASE: string = 'yggdrasil_test';
    static ORMCONFIG_SYNCRONIZE: boolean = true;
    static ORMCONFIG_LOGGING: boolean = false;
}