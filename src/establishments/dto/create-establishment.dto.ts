import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class CreateEstablishmentDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    cnpj: string

    @IsString()
    @IsNotEmpty()
    address: string
    
    @IsOptional()
    @IsNumber()
    phone: string
    
    @IsOptional()
    @IsNumber()
    motorcycle_parking_qty: number = 0
    
    @IsNumber()
    @IsNotEmpty()
    car_parking_qty: number
}
