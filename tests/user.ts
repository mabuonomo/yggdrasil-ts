import { expect } from 'chai';
import { UserModel } from "../src/models/userModel";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { ProfileModel } from '../src/models/profileModel';
import * as config from '../config';

describe('User', function () {
    describe('User init', function () {
        it('should return _id is undefined', function () {
            var user = new UserModel();
            expect(user._id).undefined;
        });
    });

    describe('User create', function () {
        it('should return _id is not undefined', async function () {
            var conn: Connection = await createConnection(config.Config.DB_CONNECTION_TEST);
            var user = new UserModel();
            var user_saved = await conn.manager.save(user);
            expect(user_saved._id).not.undefined;
            conn.close();
        });
    });

    describe('User getByEmail found', function () {
        it('should return user is not undefined', async function () {
            var conn: Connection = await createConnection(config.Config.DB_CONNECTION_TEST);
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
            var conn: Connection = await createConnection(config.Config.DB_CONNECTION_TEST);
            var user_found = await conn.manager.findOne(UserModel, { profile: { email: 'nothing' } })
            expect(user_found).undefined;
            conn.close();
        });
    });
});