import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";
import { Column as ColumnORM } from "typeorm";
import { ProfileInterface } from "../interfaces/models/profileInterface";

@ObjectTypeQL()
export class ProfileModel implements ProfileInterface {

    @FieldQL()
    @ColumnORM()
    pic_url: String;

    @FieldQL()
    @ColumnORM()
    birthday: Date;

    @FieldQL()
    @ColumnORM()
    first_name: String;

    @FieldQL()
    @ColumnORM()
    last_name: String;

    @FieldQL()
    @ColumnORM()
    email: String;

}