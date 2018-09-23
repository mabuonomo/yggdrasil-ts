import "reflect-metadata";
import { getManager, EntityManager } from "typeorm";
import { UserModel } from "../models/userModel";
import * as jwt from 'jsonwebtoken';
import { ControllerInteface } from "../interfaces/controller/controllerInterface";

export class UserController implements ControllerInteface {

    manager: EntityManager;
    constructor() {
        this.manager = getManager();
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

}