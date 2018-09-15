import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";
import { compareSync } from "bcrypt";
import { Column as ColumnORM, Entity as EntityORM, ObjectIdColumn } from "typeorm";
import { ProfileModel } from "./profileModel";
import { SocialModel } from "./socialModel";
import { UserInterface } from "../interfaces/models/userInterface";
import { InfoModel } from "./inforModel";

@ObjectTypeQL()
@EntityORM()
export class UserModel implements UserInterface {

    @FieldQL()
    @ObjectIdColumn()
    _id: string;

    @FieldQL({ nullable: true })
    token: string;

    @FieldQL({ nullable: true })
    result: boolean;

    @FieldQL({ nullable: true })
    error: string;

    @FieldQL({ nullable: true })
    info: InfoModel;

    @FieldQL()
    @ColumnORM()
    name: string;

    @FieldQL()
    @ColumnORM()
    password: string;

    @FieldQL()
    @ColumnORM(type => SocialModel)
    social: SocialModel

    @FieldQL()
    @ColumnORM(type => ProfileModel)
    profile: ProfileModel

    comparePassword = function (password) {
        return compareSync(password, this.password);
    }
}
