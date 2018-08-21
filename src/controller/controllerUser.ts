// import { User } from "../models/userModel";
// import { hashSync } from "bcrypt";
// import { Request, Response, NextFunction } from 'express';

// export class ControllerUser {
//     constructor() { 
//         this.register = this.register.bind(this);
//     }

//     public async register(req: Request, res: Response, next: NextFunction) {
//         var newUser = new User(req.body);
//         newUser.hash_password = hashSync(req.body.password, 10);
//         try {
//             var user = await newUser.save();
//             user.hash_password = undefined;
//             return res.json(user);
//         } catch (err) {
//             return res.status(400).send({
//                 message: err
//             });
//         }
//     }
// }

// export default new ControllerUser();