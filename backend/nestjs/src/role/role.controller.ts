import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import RequireLogin from '../decorators/RequireLogin';
import RequirePermission from '../decorators/RequirePermission';
import { CreateRoleDto } from './dto/create-role.dto';
import { BusinessException } from '../filters/business.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../user/entities/permission.entity';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { DeleteRoleDto } from './dto/delete-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Inject(PermissionService)
  private permissionService: PermissionService;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @ApiOperation({ summary: '创建角色' })
  @RequireLogin()
  @RequirePermission('createRole')
  @Post('create')
  async createRole(@Body(ValidationPipe) createRoleDto: CreateRoleDto) {
    const allPermissionNames =
      await this.permissionService.getAllPermissionNames();
    const unexpected = [];
    createRoleDto.permissions.forEach((name) => {
      if (!allPermissionNames.includes(name)) {
        unexpected.push(name);
      }
    });
    if (unexpected.length > 0) {
      throw new BusinessException(
        `以下权限名称不存在：${unexpected.join(',')}`,
      );
    }

    await this.roleService.createRole(createRoleDto);

    return '创建角色成功';
  }

  @ApiOperation({ summary: '删除角色' })
  @RequireLogin()
  @RequirePermission('deleteRole')
  @Post('delete')
  async deleteRole(@Body(ValidationPipe) deleteRoleDto: DeleteRoleDto) {
    await this.roleService.deleteRole(deleteRoleDto);
    return '删除角色成功';
  }
}
