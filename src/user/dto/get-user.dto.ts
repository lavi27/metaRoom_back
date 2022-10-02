import { IsNotEmpty, IsNumber } from "class-validator";

export class getUserDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number;
}