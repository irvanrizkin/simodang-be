import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
} from '@nestjs/common';

export const RoleGuard = (role: string) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      if (request['user'].role !== role) {
        throw new ForbiddenException();
      }
      return true;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
