import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";
import { compareSync } from "bcrypt";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ProfileModel } from "./profileModel";
import { SocialModel } from "./socialModel";
import { UserInterface } from "../interfaces/models/userInterface";

@ObjectType()
@Entity()
export class UserModel implements UserInterface {

    @Field()
    @ObjectIdColumn()
    _id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column(type => SocialModel)
    social: SocialModel

    @Field()
    @Column(type => ProfileModel)
    profile: ProfileModel

    comparePassword = function (password) {
        return compareSync(password, this.password);
    }
}
