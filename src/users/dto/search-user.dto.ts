import { PartialType } from '@nestjs/mapped-types'
import { IsNumberString, IsNotEmpty, IsBooleanString } from "class-validator"
import { UpdateUserDto } from './update-user.dto'

export class SearchUserDto extends PartialType(UpdateUserDto) {
    @IsNumberString()
    @IsNotEmpty()
    page: number;

    @IsNumberString()
    @IsNotEmpty()
    limit: number;

    @IsBooleanString()
    @IsNotEmpty()
    deleted: boolean;
}