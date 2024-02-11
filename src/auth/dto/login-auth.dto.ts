import { PartialType } from '@nestjs/mapped-types'
import { SignUpAuthDto } from './signup-auth.dto'

export class LoginAuthDto extends PartialType(SignUpAuthDto) {
}