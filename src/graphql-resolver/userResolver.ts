import "reflect-metadata";
import { Arg, Resolver, Query, Ctx } from "type-graphql";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import { UserController } from "../controller/userController";

@Resolver(UserModel)
export class UserResolver {

    manager: EntityManager;
    userController: UserController;
    constructor() {
        this.manager = getManager();
        this.userController = new UserController();
    }

    @Query(returns => UserModel)
    async getById(@Arg("id") id: string, @Ctx() jwt?: UserModel) {

        return await this.userController.getById(id);
    }

    @Query(returns => UserModel)
    async getByEmail(@Arg("email") email: string) {

        return await this.userController.getByEmail(email);
    }
}