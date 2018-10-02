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
import { throws } from "assert";
import { UserRepository } from "../repository/userRepository";

export class UserController implements ControllerInteface {

    userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * 
     * @param user 
     */
    public async save(user: UserModel) {
        return await this.userRepository.save(user);
    }

    /**
     * 
     * @param email 
     */
    public async getByEmail(email: String) {
        return await this.userRepository.getByEmail(email);
    }

    /**
     * 
     * @param id 
     */
    public async getById(id: string) {
        return await this.userRepository.getById(id);
    }

    /**
     * 
     * @param user 
     */
    public createJwtToken(user: UserModel) {
        return jwt.sign(JSON.stringify(user), 'your_jwt_secret'); 7
    }

    /**
     * 
     * @param user 
     * @param err 
     * @param info 
     */
    public userAuth(user: UserModel, err, info: InfoModel) {
        if (user === undefined) {
            user = this._createNewUserModel();
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

    /**
     * 
     * @param profile 
     */
    public async socialCheckUser(profile: ProfileSocialInterface): Promise<UserModel> {
        if (profile === undefined) {
            return null;
        }

        if (profile.email === undefined) {
            var user = this._createNewUserModel();
            user.result = false;
            user.info = new InfoModel();
            user.info.message = Constants.social_email_missing;

            return user;
        }

        var user = await this.getByEmail(profile.email);
        if (user === undefined) {
            user = this._createNewUserModel();
        }

        user.result = true;
        user = this._fillSocialUser(user, profile);

        await this.save(user);

        return user;
    }

    /**
     * 
     */
    private _createNewUserModel() {
        var user = new UserModel();
        user.profile = new ProfileModel();
        user.social = new SocialModel();

        return user;
    }

    /**
     * 
     * @param user 
     * @param profile 
     */
    private _fillSocialUser(user: UserModel, profile: ProfileSocialInterface): UserModel {

        if (user.social === undefined) {
            user.social = new SocialModel();
        }

        if (user.profile === undefined) {
            user.profile = new ProfileModel();
        }

        user.social.id_facebook = profile.id;
        user.profile.first_name = profile.first_name;
        user.profile.last_name = profile.last_name;

        return user;
    }

}