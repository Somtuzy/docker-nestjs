import { IsEmail, IsNumber, IsString, IsNumberString, IsStrongPassword, MinLength, MaxLength, IsEnum, IsOptional } from "class-validator"
export enum Role {
    admin = 'admin',
    user = 'user'
}

export class CreateUserDto {
    // @IsString()
    // @MinLength(3)
    // @MaxLength(69)
    // displayName: string;

    // @IsString()
    // @MinLength(1)
    // @MaxLength(33)
    // username: string;
    
    // @IsNumberString()
    // @MinLength(4)
    // @MaxLength(11)
    // phoneNumber: string;

    @IsEmail()
    email: string;

    @IsEnum(Role)
    @IsOptional()
    role: string;

    // @IsStrongPassword()
    @MinLength(8)
    @MaxLength(25)
    password: string;
}