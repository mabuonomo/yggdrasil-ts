import { ProfileInterface } from "./profileInterface";
import { SocialInterface } from "./socialInterface";

export interface UserInterface {

    password: String,
    social: SocialInterface,
    profile: ProfileInterface,

}