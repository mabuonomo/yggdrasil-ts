import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";

@ObjectTypeQL()
export class LoginModel {

    constructor(result: boolean, jwt: string, message: string, code: number) {
        this.result = result;
        this.jwt = jwt;
        this.message = message;
        this.code = code;
    }

    @FieldQL()
    result: boolean;

    @FieldQL({ nullable: true })
    jwt: string;

    @FieldQL()
    message: string;

    @FieldQL()
    code: number;
}
