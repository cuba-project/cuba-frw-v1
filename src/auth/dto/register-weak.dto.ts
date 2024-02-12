import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength, isIdentityCard } from "class-validator";

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
    @IsOptional()
    phone:number
    
    @IsOptional()
    customer_role_id:number = 1
    
    @IsNumber()
    is_active:number = 1

    @IsOptional()
    identity_document:string
}