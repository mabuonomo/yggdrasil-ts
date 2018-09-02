
import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";
import { ProfileInput } from "./profileInput";

@InputType()
export class LoginInput {

    @Field()
    @MaxLength(30)
    email: string

    @Field()
    password: string
}