import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles } from '../interface';
import { validMetaRoles } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    validMetaRoles(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
