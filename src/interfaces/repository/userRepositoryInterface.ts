import { UserModel } from "../../models/userModel";

export interface UserRepositoryInterface {
    getById(id: string);
    getByEmail(email: string);
    save(user: UserModel);
}