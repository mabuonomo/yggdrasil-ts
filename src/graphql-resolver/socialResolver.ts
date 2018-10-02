import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserModel } from "../models/userModel";
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import { SignController } from "../controller/signController";

const config = require('../../config.json');

@Resolver(UserModel)
export class SocialResolver {

    userController: UserController;
    signController: SignController;
    constructor() {
        this.userController = new UserController();
        this.signController = new SignController();
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
                user = await (new SignController()).socialCheckUser(user_fb);

                // success, create jwt token
                resolve((new SignController()).userAuth(user, err, null));
            });
        });
    }
}