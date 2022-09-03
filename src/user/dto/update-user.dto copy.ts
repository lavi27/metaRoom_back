import { PartialType } from "@nestjs/mapped-types";
import { Contains, IsString, length, max, min } from "class-validator";

export class createUseasdfasdfgrDto {
    @IsString()
    readonly name?: string;

    @IsString()
    readonly pw?: string;

    @IsString({ each: true })
    readonly asdf?: string[];

    // @length
    // @Contains
    // @min
    // @max
}