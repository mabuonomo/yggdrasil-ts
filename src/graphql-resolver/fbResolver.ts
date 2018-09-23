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

const config = require('../../config.json');

@Resolver(UserModel)
export class FBResolver {

    me_field = config.facebook_fields;
    manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    @Query(returns => UserModel)
    async facebook(@Arg("access_token") access_token: String) {
        var access_token = access_token;

        graph.setAccessToken(access_token);

        var fb = await graph.get(this.me_field, function (err, user_fb) {
            console.log(user_fb);
            console.log(err);
        });
        // console.log(fb);
        // console.log(fb.err);

        console.log("out");
        var user = new UserModel();
        user.name = 'sdasds';
        return user;
    }


}