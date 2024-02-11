import { IsEmail, IsNumber, IsString, IsNumberString, IsStrongPassword, MinLength, MaxLength } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(69)
    displayName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(33)
    username: string;
    
    @IsNumberString()
    @MinLength(4)
    @MaxLength(11)
    phoneNumber: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(25)
    @IsStrongPassword()
    password: string;
}