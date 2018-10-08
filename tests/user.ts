import { expect } from 'chai';
import { UserModel } from "../src/models/userModel";
import { createConnection, Connection } from "typeorm";
import { ProfileModel } from '../src/models/profileModel';

const config = require("../config.json");

let connection = {
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
};

describe('User', function () {
    describe('User init', function () {
        it('should return _id is undefined', function () {
            var user = new UserModel();
            expect(user._id).undefined;
        });
    });

    describe('User create', function () {
        it('should return _id is not undefined', async function () {
            var conn: Connection = await createConnection(connection);
            var user = new UserModel();
            var user_saved = await conn.manager.save(user);
            expect(user_saved._id).not.undefined;
            conn.close();
        });
    });

    describe('User getByEmail found', function () {
        it('should return user is not undefined', async function () {
            var conn: Connection = await createConnection(connection);
            var user = new UserModel();
            user.profile =new ProfileModel();
            user.profile.email= "email@email.it";
            await conn.manager.save(user);

            var user_found = await conn.manager.findOne(UserModel, { profile: { email: user.profile.email } })
            expect(user_found).not.undefined;
            conn.close();
        });
    });

    describe('User getByEmail not found', function () {
        it('should return user undefined', async function () {
            var conn: Connection = await createConnection(connection);
            var user_found = await conn.manager.findOne(UserModel, { profile: { email: 'nothing' } })
            expect(user_found).undefined;
            conn.close();
        });
    });
});