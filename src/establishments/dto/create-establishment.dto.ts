import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateIf } from "class-validator"

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
    @ValidateIf(o => o.phone !== null && o.phone !== '')
    @IsPhoneNumber('BR')
    phone: string
    
    @IsOptional()
    @IsNumber()
    motorcycle_parking_qty: number = 0
    
    @IsNumber()
    @IsNotEmpty()
    car_parking_qty: number
}
