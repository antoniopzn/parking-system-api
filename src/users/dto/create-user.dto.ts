import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    id_establishment: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
