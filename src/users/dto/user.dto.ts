import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string;
    
    @IsNotEmpty()
    @IsString()
    readonly username:string;
  
    @IsNotEmpty()
    @IsEmail()
    readonly emial:string;
  
    @IsNotEmpty()
    @IsString()
    readonly password:string;
}