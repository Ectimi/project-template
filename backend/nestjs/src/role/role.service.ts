import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../user/entities/role.entity';
import { Permission } from '../user/entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async createRole(createRoleDto: CreateRoleDto) {
    const role = new Role();
    role.name = createRoleDto.name;
    role.permissions = [];

    for (let i = 0; i < createRoleDto.permissions.length; i++) {
      const name = createRoleDto.permissions[i];
      const permission = await this.permissionRepository.findOneBy({ name });
      if (permission) {
        role.permissions.push(permission);
      }
    }

    return await this.roleRepository.save(role);
  }

  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const foundRole = await this.roleRepository.findOne({
      where: { id: deleteRoleDto.roleId },
      relations: ['permissions'],
    });
    if (foundRole) {
      foundRole.permissions = [];
      await this.roleRepository.save(foundRole);
      await this.roleRepository.delete(deleteRoleDto.roleId);
    }
  }

  async findRolesByIds(roleIds: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }
}
