import "reflect-metadata";
import { Arg, Resolver, Query, Ctx } from "type-graphql";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";

@Resolver(UserModel)
export class UserResolver {

    manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    @Query(returns => UserModel)
    async getById(@Arg("id") id: string, @Ctx() jwt?: UserModel) {
        var user: UserModel = await this.manager.findOne(UserModel, id);

        return user;
    }

    @Query(returns => UserModel)
    async getByEmail(@Arg("email") email: string) {

        return await this.manager.findOne(UserModel, { profile: { email: email } });//{ 'profile.email': email });
    }
}