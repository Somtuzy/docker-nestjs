import { Controller, Get, Body, Patch, Param, Delete, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, SearchUserDto, Role } from './dto';
import { JwtGuard } from 'src/auth/guards';
import { User, Auth } from 'src/auth/decorators';
import { Users } from './schemas';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: SearchUserDto) {
    return this.usersService.searchUsers(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@User() user: Users) { 
    return user
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @Auth(Role.admin)
  @HttpCode(HttpStatus.OK)
  @Patch(':id/remove')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.editUser(id, UpdateUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}