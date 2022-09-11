import { IsNotEmpty, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly pw: string;

    // @IsString({ each: true })
    // @IsNotEmpty()
    // readonly asdf: string[];
}