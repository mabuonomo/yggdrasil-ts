import "reflect-metadata";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import { UserRepositoryInterface } from "../interfaces/repository/userRepositoryInterface";

export class UserRepository implements UserRepositoryInterface {

    manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    /**
     * 
     * @param user 
     */
    public async save(user: UserModel) {
        return await this.manager.save(user);
    }

    /**
     * 
     * @param email 
     */
    public async getByEmail(email: String) {
        var user = await this.manager.findOne(UserModel, { profile: { email: email } })
        if (!user) {
            return UserModel.createEmpty();
        }

        return user;
    }

    /**
     * 
     * @param id 
     */
    public async getById(id: string) {
        var user: UserModel = await this.manager.findOne(UserModel, id);
        if (!user) {
            return UserModel.createEmpty();
        }

        return user;
    }

}