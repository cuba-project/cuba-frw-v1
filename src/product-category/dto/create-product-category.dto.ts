import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateProductCategoryDto {
    
    @Transform(({value})=>value.trim())
    @IsString()
    name:string;
}

