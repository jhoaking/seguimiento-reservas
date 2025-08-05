import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateServicioDto {

    @IsString()
    @MinLength(1)
    name:string

    @IsString()
    @IsOptional()
    description?:string

    @IsNumber()
    @IsPositive()
    price:number

    @IsNumber()
    @IsPositive()
    duration:number

    @IsOptional()
    @IsBoolean()
    activo?:boolean

  
}
