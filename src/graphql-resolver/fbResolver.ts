import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserModel } from "../models/userModel";
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";

const config = require('../../config.json');

@Resolver(UserModel)
export class FBResolver {

    me_field = config.facebook_fields;
    userController: UserController;

    constructor() {
        this.userController = new UserController();
    }

    @Query(returns => UserModel)
    async facebook(@Arg("access_token") access_token: String) {
        var access_token = access_token;

        graph.setAccessToken(access_token);

        return await new Promise((resolve, reject) => {
            var fb = graph.get(this.me_field, async function (err, user_fb: ProfileSocialInterface) {

                var user = new UserModel();
                if (err || !user_fb) {
                    user.result = false;
                    user.error = err;
                    resolve(user);
                }

                user = await (new UserController()).socialCheckUser(user_fb);

                resolve(user);
            });
        });
    }


}