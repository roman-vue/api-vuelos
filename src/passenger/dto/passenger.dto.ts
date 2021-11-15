import { IsNotEmpty, IsString } from "class-validator";

export class PassengerDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;
}