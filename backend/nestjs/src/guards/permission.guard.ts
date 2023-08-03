import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../redis/redis.service';
import { BusinessException } from '../filters/business.exception';
import { RoleService } from '../role/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(RoleService)
  private roleService: RoleService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }

    const redisKey = `${request.user.roles
      .map(({ name }) => name)
      .join('-')}_permissions`;

    let permissions = await this.redisService.listGet(redisKey);

    if (permissions.length === 0) {
      const roles = await this.roleService.findRolesByIds(
        request.user.roles.map((item) => item.id),
      );

      permissions = roles
        .reduce((total, current) => {
          total.push(...current.permissions);
          return total;
        }, [])
        .map((permission) => permission.name);

      await this.redisService.listSet(redisKey, permissions, 60 * 30);
    }

    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>('require-permission', [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find((name) => name === curPermission);
      if (!found) {
        throw BusinessException.throwForbidden();
      }
    }

    return true;
  }
}
