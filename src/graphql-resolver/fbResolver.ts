import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserInput } from "../graphql-input/userInput";
import { deserialize } from "class-transformer";
import { hashSync } from "bcrypt";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import * as passport from 'passport';
import { Request, NextFunction } from "express";
import { LoginInput } from "../graphql-input/loginInput";
import { Response } from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
import * as graph from 'fbgraph';
import { UserController } from "../controller/userController";
import { Constants } from "../utility/global";
import { InfoModel } from "../models/inforModel";
import { ProfileModel } from "../models/profileModel";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";

const config = require('../../config.json');

@Resolver(UserModel)
export class FBResolver {

    me_field = config.facebook_fields;
    manager: EntityManager;
    userController: UserController;

    constructor() {
        this.manager = getManager();
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
                }

                if (user_fb) {
                    if (user_fb.email === undefined) {
                        user.result = false;
                        user.error = err;
                        user.info = new InfoModel();
                        user.info.message = Constants.social_email_missing;
                    } else {
                        user = await (new UserController()).getByEmail(user_fb.email);
                        user.result = true;
                        user.social.id_facebook = user_fb.id;
                        user.profile.first_name = user_fb.first_name;
                        user.profile.last_name = user_fb.last_name;
                    }
                }

                resolve(user);
            });
        });
    }


}