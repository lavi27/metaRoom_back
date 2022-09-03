import { IsString } from "class-validator";

export class createUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly pw: string;

    @IsString({ each: true })
    readonly asdf: string[];
}