import { expect } from 'chai';
import { UserModel } from "../src/models/userModel";
import { createConnection } from "typeorm";

const ormconfig = require("../ormconfig.json");

describe('User', function () {
    describe('User create', function () {
        it('should return _id > 0', async function () {

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
            }).then(async connection => {
                // here you can start to work with your entities
                var user = new UserModel();
                var user_saved = await connection.manager.save(user);
                expect(user_saved._id).not.null;

            }).catch(error => console.log(error));

        });
    });
});