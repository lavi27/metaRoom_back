import { IsNotEmpty, IsString } from "class-validator";

export class loginUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly pw: string;
}