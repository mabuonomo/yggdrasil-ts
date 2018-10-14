import "reflect-metadata";
import { UserModel } from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { InfoModel } from "../models/inforModel";
import { ProfileSocialInterface } from "../interfaces/models/profileSocialInterface";
import { Constants } from "../utility/global";
import { ProfileModel } from "../models/profileModel";
import { SocialModel } from "../models/socialModel";
import { UserRepository } from "../repository/userRepository";
import { AuthException } from "../exception/authException";
import { UserNotFoundException } from "../exception/userNotFoundException";
import { EmailNotFoundException } from "../exception/emailNotFoundException";

export class SignController {

    userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * 
     * @param user 
     */
    public createJwtToken(user: UserModel) {
        return jwt.sign(JSON.stringify(user), 'your_jwt_secret');
    }

    /**
     * Authentication, return jwt token if successfully
     * 
     * @param user 
     * @param err 
     * @param info 
     */
    public userAuth(user: UserModel, err, info: InfoModel) {
        if (user === undefined) {
            throw new AuthException();
        }

        const token = this.createJwtToken(user);
        user.token = token;
        user.result = true;
        user.info = info;

        return user;
    }

    /**
     * Social, find an existing user and update it
     * 
     * @param profile 
     */
    public async socialCheckUser(profile: ProfileSocialInterface): Promise<UserModel> {
        if (profile === undefined) {
            throw new UserNotFoundException();
        }

        if (profile.email === undefined) {
            throw new EmailNotFoundException(Constants.ERROR_SOCIAL_EMAIL_MISSING);
        }

        var user = await this.userRepository.getByEmail(profile.email);
        if (user === undefined) {
            user = this.initUserModel();
        }

        user = this.fillSocialUser(user, profile);

        await this.userRepository.save(user);

        return user;
    }

    /**
     * Create an empty user
     */
    private initUserModel() {
        var user = new UserModel();
        user.profile = new ProfileModel();
        user.social = new SocialModel();

        return user;
    }

    /**
     * Update user profile from social info
     * 
     * @param user 
     * @param profile 
     */
    private fillSocialUser(user: UserModel, profile: ProfileSocialInterface): UserModel {

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