import { expect } from 'chai';
import { UserModel } from "../src/models/userModel";
import { createConnection } from "typeorm";

const config = require("../config.json");

describe('User', function () {
    describe('User init', function () {
        it('should return _id is undefined', function () {
            var user = new UserModel();
            console.log(user._id);
            expect(user._id).undefined;
        });
    });

    describe('User create', function () {
        it('should return _id is not undefined', function () {

            createConnection({
                type: config.ormconfig.type,
                host: config.ormconfig.host,
                port: config.ormconfig.port,
                username: config.ormconfig.username,
                password: config.ormconfig.password,
                database: config.ormconfig.database,
                entities: [
                    UserModel
                ],
                synchronize: true,
                logging: true
            }).then(async connection => {
                // here you can start to work with your entities
                var user = new UserModel();
                var user_saved = await connection.manager.save(user);
                expect(user_saved._id).not.undefined;

            }).catch(error => console.log(error));

        });
    });
});