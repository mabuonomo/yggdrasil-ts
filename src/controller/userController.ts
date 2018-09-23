import "reflect-metadata";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { ControllerInteface } from "../interfaces/controller/controllerInterface";
import { InfoModel } from "../models/inforModel";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import { Constants } from "../utility/global";

export class UserController implements ControllerInteface {

    manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }

    public async save(user: UserModel) {
        return await this.manager.save(user);
    }

    public async getByEmail(email: String) {
        var user = await this.manager.findOne(UserModel, { profile: { email: email } })
        if (!user) {
            return null;
        }

        return user;
    }

    public async getById(id: string) {
        var user: UserModel = await this.manager.findOne(UserModel, id);
        if (!user) {
            return null;
        }

        return user;
    }

    public createJwtToken(user: UserModel) {

        return jwt.sign(JSON.stringify(user), 'your_jwt_secret'); 7
    }

    public userAuth(user: UserModel, err, info: InfoModel) {
        if (user === undefined) {
            user = new UserModel();
            user.result = false;
            user.error = err;
            user.info = info;

            return user;
        }

        const token = this.createJwtToken(user);
        user.token = token;
        user.result = true;
        user.info = info;

        return user;
    }

    public async socialCheckUser(profile: ProfileSocialInterface): Promise<UserModel> {
        if (profile === undefined) {
            return null;
        }

        var user = new UserModel();
        if (profile.email === undefined) {
            user.result = false;
            user.info = new InfoModel();
            user.info.message = Constants.social_email_missing;
        } else {
            user = await this.getByEmail(profile.email);
            user.result = true;
            user.social.id_facebook = profile.id;
            user.profile.first_name = profile.first_name;
            user.profile.last_name = profile.last_name;
        }

        return user;
    }

}