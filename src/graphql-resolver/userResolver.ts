import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
import { UserInput } from "../graphql-input/userInput";
import { deserialize } from "class-transformer";
import { hashSync } from "bcrypt";
import { getManager } from "typeorm";
import { UserModel } from "../models/userModel";

@Resolver(UserModel)
export class UserResolver {
    constructor(
    ) { }

    @Query(returns => UserModel)
    async getById(@Arg("id") id: string, @Ctx() jwt?: UserModel) {
        const manager = getManager();

        var user: UserModel = await manager.findOne(UserModel, id);
        return user;
    }

    @Query(returns => UserModel)
    async getByEmail(@Arg("email") email: string) {
        const manager = getManager();

        return await manager.findOne(UserModel, { 'profile.email': email });
    }

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