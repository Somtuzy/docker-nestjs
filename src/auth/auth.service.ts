import { Injectable, BadRequestException, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt"
import { SignUpAuthDto, LoginAuthDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { CustomException } from 'src/common/filters/exception.filter';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService, private config: ConfigService) { }

  async signup(SignUpAuthDto: SignUpAuthDto) {
    try {
      const isExistingUser = await this.usersService.findUserByEmailOrUsername({ email: SignUpAuthDto.email })
      if (isExistingUser) throw new CustomException("Username or email not available.", 401)

      SignUpAuthDto.password = await this.hashPassword(SignUpAuthDto.password)
      const user = await this.usersService.createUser(SignUpAuthDto)

      const payload = {
        sub: user._id,
        email: user.email,
        role: user.role
      }

      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: this.config.get('jwt.expiresIn'),
        secret: this.config.get('jwt.secret')
      })

      return { ...payload, access_token };
    } catch (err) {
      return err
    }
  }

  async login(LoginAuthDto: LoginAuthDto) {
    try {
      const user = await this.usersService.findUserByEmailOrUsername({ email: LoginAuthDto.email })
      
      if (!user) {
        throw new BadRequestException("Invalid username or password")
      }

      const isValidPassword = await this.comparePassword(LoginAuthDto.password, user.password)
      
      if (!isValidPassword) {
        throw new BadRequestException("Invalid username or password")
      }

      const payload = {
        sub: user._id,
        email: user.email
      }

      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: this.config.get('jwt.expiresIn'),
        secret: this.config.get('jwt.secret')
      })

      return { ...payload, access_token };
    } catch (err) {
      return err
    }
  }

  async validateUser(payload: { email: string }) {
    try {
      let user: any = await this.usersService.findUserByEmailOrUsername({ email: payload.email });

      if (!user) {
        throw new UnauthorizedException();
      }

      user = user.toObject()
      delete user.password

      return user;
    } catch (err) {
      return err
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, await bcrypt.genSalt(15))
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async comparePassword(requestPassword: string, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(requestPassword, password)
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async generateToken(payload: { [key: string]: any }) {
    try {
      return await this.jwtService.signAsync(payload, {
        expiresIn: this.config.get('jwt.expiresIn'),
        secret: this.config.get('jwt.secret')
      })
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
