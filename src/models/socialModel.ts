import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";
import { Column as ColumnORM } from "typeorm";
import { SocialInterface } from "../interfaces/models/socialInterface";

@ObjectTypeQL()
export class SocialModel implements SocialInterface {

    @FieldQL()
    @ColumnORM()
    id_facebook: String;

    @FieldQL()
    @ColumnORM()
    id_google: String;
}