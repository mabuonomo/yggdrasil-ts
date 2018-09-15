import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";
import { Column } from "typeorm";
import { SocialInterface } from "../interfaces/models/socialInterface";

@ObjectType()
export class SocialModel implements SocialInterface {

    @Field()
    @Column()
    id_facebook: String;

    @Field()
    @Column()
    id_google: String;
}