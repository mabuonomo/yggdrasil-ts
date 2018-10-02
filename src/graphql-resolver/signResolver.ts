import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserInput } from "../graphql-input/userInput";
import { deserialize } from "class-transformer";
import { hashSync } from "bcrypt";
import { UserModel } from "../models/userModel";
import * as passport from 'passport';
import { Request, NextFunction } from "express";
import { LoginInput } from "../graphql-input/loginInput";
import { Response } from "express-serve-static-core";
import { UserController } from "../controller/userController";
import { InfoModel } from "../models/inforModel";
import { SignController } from "../controller/signController";

@Resolver(UserModel)
export class SignResolver {

    userController: UserController;
    signController: SignController;
    constructor() {
        this.userController = new UserController();
        this.signController = new SignController();
    }

    @Query(returns => UserModel)
    async signIn(@Arg("loginInput") loginInput: LoginInput, @Ctx() req: Request, @Ctx() res: Response, @Ctx() next: NextFunction) {

        req.body.email = loginInput.email;
        req.body.password = loginInput.password;

        return await new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, async (err, user: UserModel, info: InfoModel) => {

                resolve(this.signController.userAuth(user, err, info));
            })(req, res, next);
        });
    }

    @Mutation(returns => UserModel)
    async signUp(@Arg("newUser") newUser: UserInput): Promise<UserModel> {

        var json = JSON.stringify(newUser);
        var user = deserialize(UserModel, json);
        user.password = hashSync(newUser.password, 10);

        var user = await this.userController.save(user);
        return user;
    }
}