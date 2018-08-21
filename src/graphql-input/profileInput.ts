import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType()
export class ProfileInput {

    @Field()
    @MaxLength(30)
    email: String;

}