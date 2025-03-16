import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateEstablishmentDto {
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    cnpj: string

    @IsNotEmpty()
    address: string
    
    @IsNumber()
    phone: number
    
    @IsNumber()
    motorcycle_parking_qty: string
    
    @IsNumber()
    @IsNotEmpty()
    car_parking_qty: string
}
