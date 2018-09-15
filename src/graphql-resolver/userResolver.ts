import "reflect-metadata";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";
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
}