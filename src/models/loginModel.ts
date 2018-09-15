import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";

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
