import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Inject, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { In, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { md5 } from 'src/utils';
import { RedisService } from 'src/redis/redis.service';
import { EmailVerifyType } from 'src/email/dto/captcha.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { BusinessException } from '../filters/business.exception';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @Inject()
  private redisService: RedisService;

  async findAll() {
    return this.userRepository.find({ relations: { roles: true } });
  }

  async login(userLoginDto: UserLoginDto) {
    const { username, email, password, captcha, type } = userLoginDto;
    const passwordWhere = username ? { username } : { email };
    const codeWhere = { email };
    const user = await this.userRepository.findOne({
      where: type === 'code' ? codeWhere : passwordWhere,
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new BusinessException('用户不存在');
    }

    if (user.isFrozen) {
      throw new BusinessException('该用户已被冻结，请联系管理员');
    }

    if (type === 'code') {
      const cacheKey = `captcha_${EmailVerifyType.Login}_${email}`;
      const code = await this.redisService.get(cacheKey);

      if (code !== captcha) {
        throw new BusinessException('验证码不正确');
      }
    } else {
      if (user.password !== md5(password)) {
        throw new BusinessException('密码错误');
      }
    }

    return user;
  }

  async register(userRegisterDto: UserRegisterDto) {
    const foundUserByUsername = await this.userRepository.findOneBy({
      username: userRegisterDto.username,
    });

    if (foundUserByUsername) {
      throw new BusinessException('用户已存在');
    }

    const foundUserByEmail = await this.userRepository.findOneBy({
      email: userRegisterDto.email,
    });

    if (foundUserByEmail) {
      throw new BusinessException('该邮箱已被注册');
    }

    const { username, password, email, captcha } = userRegisterDto;
    const cacheKey = `captcha_${EmailVerifyType.Register}_${email}`;
    const code = await this.redisService.get(cacheKey);

    if (code !== captcha) {
      throw new BusinessException('验证码不正确');
    }

    const defaultRoleNames = ['customer'];
    const roles = await this.roleRepository.find({
      where: {
        name: In(defaultRoleNames),
      },
    });

    const newUser = new User();
    newUser.username = username;
    newUser.password = md5(password);
    newUser.email = email;
    newUser.roles = roles;
    newUser.nickName = `用户_${randomStringGenerator()}`;

    try {
      await this.redisService.delete(cacheKey);
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      return '注册失败';
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (updateUserDto.nickName) {
      foundUser.nickName = updateUserDto.nickName;
    }
    if (updateUserDto.headPic) {
      foundUser.headPic = updateUserDto.headPic;
    }

    try {
      await this.userRepository.save(foundUser);
      return '用户信息修改成功';
    } catch (e) {
      return '用户信息修改成功';
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { email, newPassword, captcha } = updatePasswordDto;
    const cacheKey = `captcha_${EmailVerifyType.UpdatePassword}_${email}`;
    const code = await this.redisService.get(cacheKey);

    if (code !== captcha) {
      throw new BusinessException('验证码不正确');
    }

    const foundUser = await this.userRepository.findOneBy({ email });
    foundUser.password = md5(newPassword);

    try {
      await this.userRepository.save(foundUser);
      return '更新密码成功';
    } catch (e) {
      return '更新密码失败';
    }
  }

  async findUserById(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
  }

  async changeUserRole(changeRoleDto: ChangeRoleDto) {
    const foundUser = await this.userRepository.findOne({
      where: { id: changeRoleDto.userId },
    });
    if (foundUser) {
      const foundRoles = await this.roleRepository.find({
        where: { id: In(changeRoleDto.roleIds) },
      });
      foundUser.roles = foundRoles;
      await this.userRepository.save(foundUser);
    }
  }

  async deleteUserById(userId: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (foundUser) {
      foundUser.roles = [];
      await this.userRepository.save(foundUser);
      await this.userRepository.delete(userId);
    }
  }

  async freezeUserById(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    user.isFrozen = true;

    await this.userRepository.save(user);
  }

  async findUsersByPage(pageNo: number, pageSize: number) {
    const skipCount = (pageNo - 1) * pageSize;

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: [
        'id',
        'username',
        'nickName',
        'email',
        'isFrozen',
        'headPic',
        'createTime',
      ],
      skip: skipCount,
      take: pageSize,
    });

    return {
      users,
      totalCount,
    };
  }

  async findUsers(
    username: string,
    nickName: string,
    email: string,
    pageNo: number,
    pageSize: number,
  ) {
    const skipCount = (pageNo - 1) * pageSize;

    const condition: Record<string, any> = {};

    if (username) {
      condition.username = Like(`%${username}%`);
    }
    if (nickName) {
      condition.nickName = Like(`%${nickName}%`);
    }
    if (email) {
      condition.email = Like(`%${email}%`);
    }

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: [
        'id',
        'username',
        'nickName',
        'email',
        'isFrozen',
        'headPic',
        'createTime',
      ],
      skip: skipCount,
      take: pageSize,
      where: condition,
    });

    return {
      users,
      totalCount,
    };
  }
}
