import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserModel } from "../models/userModel";
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import * as google from 'googleapis';

const config = require('../../config.json');

@Resolver(UserModel)
export class SocialResolver {

    userController: UserController;
    oath2Client: google.oauth2_v2.Oauth2;
    plus: google.plus_v1.Plus;
    constructor() {
        this.userController = new UserController();

        this.oath2Client = new google.oauth2_v2.Oauth2(
            config.google_client_id,
            config.google_client_secret
        );
        this.plus = new google.plus_v1.Plus;
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

        var tokens = { access_token: access_token, refresh_token: refresh_token };
        this.oath2Client.setCredentials(tokens);
        return await new Promise((resolve, reject) => {

        });
    });
}
}