import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMovementDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id_establishment: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id_vehicle: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dh_entry: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dh_exit: Date;
}
