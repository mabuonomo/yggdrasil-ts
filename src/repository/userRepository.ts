import "reflect-metadata";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { ControllerInteface } from "../interfaces/controller/controllerInterface";
import { InfoModel } from "../models/inforModel";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import { Constants } from "../utility/global";
import { ProfileModel } from "../models/profileModel";
import { SocialModel } from "../models/socialModel";
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
            return null;
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
            return null;
        }

        return user;
    }

}