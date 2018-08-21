
import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";
import { ProfileInput } from "./profileInput";

@InputType()
export class UserInput {

    @Field()
    profile: ProfileInput
    
    @Field()
    @MaxLength(30)
    name : string

    @Field()
    password : string
}