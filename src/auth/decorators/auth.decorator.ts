import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from '../guards';
import { Role } from 'src/users/dto';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(JwtGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse()
    )
}