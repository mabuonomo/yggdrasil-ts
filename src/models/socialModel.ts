import "reflect-metadata";
import { ObjectType, Field, InputType } from "type-graphql";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
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