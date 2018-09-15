import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserInput } from "../graphql-input/userInput";
import { deserialize } from "class-transformer";
import { hashSync } from "bcrypt";
import { getManager } from "typeorm";
import { UserModel } from "../models/userModel";

@Resolver(UserModel)
export class SignResolver {
    constructor(
    ) { }

    @Mutation(returns => UserModel)
    async insert(@Arg("newUser") newUser: UserInput): Promise<UserModel> {
        const manager = getManager();

        var json = JSON.stringify(newUser);
        var user = deserialize(UserModel, json);
        user.password = hashSync(newUser.password, 10);

        var user = await manager.save(user);
        return user;
    }
}