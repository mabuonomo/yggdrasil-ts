import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserModel } from "../models/userModel";
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
// import { OAuth2Client } from "google-auth-library";
// const { google } = require('googleapis');
const config = require('../../config.json');

@Resolver(UserModel)
export class SocialResolver {

    userController: UserController;
    // oauth2Client: OAuth2Client;
    // plus;
    constructor() {
        this.userController = new UserController();

        // var OAuth2 = google.auth.OAuth2;
        // this.oauth2Client = new OAuth2(
        //     config.google_client_id,
        //     config.google_client_secret
        // );

        // this.plus = google.plus('v1');
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

                // success, create jwt token
                resolve((new UserController()).userAuth(user, err, null));
            });
        });
    }

    // @Query(returns => UserModel)
    // async google(@Arg("access_token") access_token: string, @Arg("refresh_token") refresh_token: string) {
    //     var access_token = access_token;

    //     var credentials = { access_token: access_token, refresh_token: refresh_token };
    //     this.oauth2Client.setCredentials(credentials);

    //     return await new Promise((resolve, reject) => {

    //         var user_google = this.plus.people.get({
    //             userId: 'me',
    //             auth: this.oauth2Client,
    //             scope: config.scopes
    //         }, function (err, response) {
    //             // handle err and response
    //             console.log(response.data);

    //             var user_google = response.data;
    //         });

    //     });
    // };

}