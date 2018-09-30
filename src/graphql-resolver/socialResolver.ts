import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserModel } from "../models/userModel";
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import * as google from 'googleapis';
import { OAuth2Client } from "google-auth-library";
import { Credentials } from "google-auth-library/build/src/auth/credentials";

const config = require('../../config.json');

@Resolver(UserModel)
export class SocialResolver {

    userController: UserController;
    oath2Client: OAuth2Client;
    plus: google.plus_v1.Plus;
    constructor() {
        this.userController = new UserController();

        this.oath2Client = new OAuth2Client(
            config.google_client_id,
            config.google_client_secret
        );

        this.plus = new google.plus_v1.Plus({
            auth: config.google_client_id
        });
    }

    @Query(returns => UserModel)
    async facebook(@Arg("access_token") access_token: String) {
        var access_token = access_token;

        graph.setAccessToken(access_token);

        return await new Promise((resolve, reject) => {
            var fb = graph.get(config.facebook_fields, async function (err, user_fb: ProfileSocialInterface) {

                var user = new UserModel();
                if (err || !user_fb) {
                    user.result = false;
                    user.error = err;

                    resolve(user);
                }
                user = await (new UserController()).socialCheckUser(user_fb);
                resolve((new UserController()).userAuth(user, err, null));

            });
        });
    }

    @Query(returns => UserModel)
    async google(@Arg("access_token") access_token: String, @Arg("refresh_token") refresh_token: String) {
        var access_token = access_token;

        var credentials: Credentials = { access_token: access_token, refresh_token: refresh_token };
        this.oath2Client.setCredentials(credentials);

        return await new Promise((resolve, reject) => {

        });
    });
}
}