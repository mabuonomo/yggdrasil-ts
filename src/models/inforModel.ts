import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";
import { compareSync } from "bcrypt";
import { Column as ColumnORM, Entity, ObjectIdColumn } from "typeorm";
import { ProfileModel } from "./profileModel";
import { SocialModel } from "./socialModel";
import { UserInterface } from "../interfaces/models/userInterface";

@ObjectTypeQL()
export class InfoModel {

    @FieldQL({ nullable: true })
    message: string;
    
}
