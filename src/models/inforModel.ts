import "reflect-metadata";
import { ObjectType as ObjectTypeQL, Field as FieldQL } from "type-graphql";

@ObjectTypeQL()
export class InfoModel {

    @FieldQL({ nullable: true })
    message: string;

}
