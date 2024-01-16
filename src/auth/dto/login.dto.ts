import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Debe de ser un correo válido.' })
    email:string;

    @Transform(({value})=>value.trim())
    @IsString()
    @MinLength(6)
    password:string;
}
