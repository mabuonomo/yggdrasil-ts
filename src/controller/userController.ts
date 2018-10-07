import "reflect-metadata";
import { UserModel } from "../models/userModel";
import { ControllerInteface } from "../interfaces/controller/controllerInterface";
import { UserRepository } from "../repository/userRepository";
import { UserNotFoundException } from "../exception/userNotFoundException";
import { Constants } from "../utility/global";

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
    public async getByEmail(email: String): Promise<UserModel> {
        var user = await this.userRepository.getByEmail(email);
        if (user === undefined) {
            throw new UserNotFoundException(Constants.ERROR_USER_NOT_FOUND);
        }

        return user;
    }

    /**
     * 
     * @param id 
     */
    public async getById(id: string) {
        return await this.userRepository.getById(id);
    }
}