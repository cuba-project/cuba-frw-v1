import { Transform } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, MinLength, isIdentityCard } from "class-validator";

export class RegisterDto {
    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email:string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(6)
    password:string;

    @IsPhoneNumber()
    phone:number
    
    @IsString()
    role:string

    identity_document:string
}