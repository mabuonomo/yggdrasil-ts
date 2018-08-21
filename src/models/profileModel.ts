import "reflect-metadata";
import { ObjectType, Field, InputType } from "type-graphql";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import { ProfileInterface } from "../interfaces/models/profileInterface";

@ObjectType()
export class ProfileModel implements ProfileInterface{

    @Field()
    @Column()
    pic_url: String;

    @Field()
    @Column()
    birthday: Date;

    @Field()
    @Column()
    first_name: String;

    @Field()
    @Column()
    last_name: String;

    @Field()
    @Column()
    email: String;

}