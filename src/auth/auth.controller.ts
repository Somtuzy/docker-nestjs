import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto, LoginAuthDto } from './dto';
import { AllExceptionsFilter } from 'src/common/filters/exception.filter';

@UseFilters(AllExceptionsFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signup(@Body() SignUpAuthDto: SignUpAuthDto) {
    return await this.authService.signup(SignUpAuthDto);
  }

  @Post('login')
  async login(@Body() LoginAuthDto: LoginAuthDto) {
    return await this.authService.login(LoginAuthDto);
  }
}