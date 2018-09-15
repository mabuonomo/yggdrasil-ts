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

@Resolver(UserModel)
export class SignResolver {

    manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    @Query(returns => UserModel)
    async signIn(@Arg("loginInput") loginInput: LoginInput, @Ctx() req: Request, @Ctx() res: Response, @Ctx() next: NextFunction) {

        req.body.email = loginInput.email;
        req.body.password = loginInput.password;

        return await new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, async (err, user: UserModel, info) => {

                if (user) {
                    const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret'); 7
                    user.token = token;
                    user.result = true;
                    user.info = info;
                }

                if (err || !user) {
                    user = new UserModel();
                    user.result = false;
                    user.error = err;
                    user.info = info;
                }

                resolve(user);

            })(req, res, next);
        });
    }

    @Mutation(returns => UserModel)
    async signUp(@Arg("newUser") newUser: UserInput): Promise<UserModel> {

        var json = JSON.stringify(newUser);
        var user = deserialize(UserModel, json);
        user.password = hashSync(newUser.password, 10);

        var user = await this.manager.save(user);
        return user;
    }
}