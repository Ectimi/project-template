import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../user/entities/role.entity';
import { Permission } from '../user/entities/permission.entity';
import { PermissionModule } from '../permission/permission.module';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), PermissionModule],
  controllers: [RoleController],
  providers: [RoleService, PermissionService],
  exports: [RoleService],
})
export class RoleModule {}
