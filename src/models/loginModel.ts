import "reflect-metadata";
import { ObjectType, Field, InputType } from "type-graphql";
import { compareSync, hashSync } from "bcrypt";
import { Column, Entity, ObjectID, ObjectIdColumn, getManager } from "typeorm";
import { ProfileModel } from "./profileModel";
import { SocialModel } from "./socialModel";
import { UserInterface } from "../interfaces/models/userInterface";

@ObjectType()
export class LoginModel {

    constructor(result: boolean, jwt: string, message: string, code: number) {
        this.result = result;
        this.jwt = jwt;
        this.message = message;
        this.code = code;
    }

    @Field()
    result: boolean;

    @Field({ nullable: true })
    jwt: string;

    @Field()
    message: string;

    @Field()
    code: number;
}
