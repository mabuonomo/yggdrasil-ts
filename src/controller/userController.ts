import "reflect-metadata";
import { UserModel } from "../models/userModel";
import { ControllerInteface } from "../interfaces/controller/controllerInterface";
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
}