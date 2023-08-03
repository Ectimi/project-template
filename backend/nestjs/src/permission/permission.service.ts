import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../user/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  async getAllPermissionNames() {
    const allPermissions = await this.permissionRepository.find({
      select: ['name'],
    });

    return allPermissions.map((permission) => permission.name);
  }
}
