import {
  Controller,
  Post,
  Body,
  Inject,
  ValidationPipe,
  Query,
  Get,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { BusinessException } from '../filters/business.exception';
import RequireLogin from '../decorators/RequireLogin';
import RequirePermission from '../decorators/RequirePermission';
import { ChangeRoleDto } from './dto/change-role.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { generateParseIntPipe } from '../utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from '../decorators/UserInfo';
import { LoginUserVo } from './vo/login-user.vo';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({
    name: 'pageNo',
    type: Number,
    required: false,
    description: '页数，默认1',
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: '每页条数，默认15',
    example: 15,
  })
  @ApiQuery({
    name: 'username',
    type: String,
    required: false,
    description: '用户名',
  })
  @ApiQuery({
    name: 'nickname',
    type: String,
    required: false,
    description: '用户昵称',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
    description: '邮箱',
  })
  @RequireLogin()
  @RequirePermission('readAllUser')
  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(15),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('nickName') nickName: string,
    @Query('email') email: string,
  ) {
    return await this.userService.findUsers(
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    );
  }

  @ApiOperation({ summary: '用户注册' })
  @ApiBody({
    type: UserRegisterDto,
  })
  @Post('register')
  async register(@Body(ValidationPipe) user: UserRegisterDto) {
    return await this.userService.register(user);
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    type: UserLoginDto,
  })
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.userService.login(userLoginDto);

    if (user) {
      const vo = new LoginUserVo();
      vo.userInfo = {
        id: user.id,
        username: user.username,
        nickName: user.nickName,
        isFrozen: user.isFrozen,
        headPic: user.headPic,
        email: user.email,
        createTime: user.createTime.getTime(),
        roles: user.roles.map((item) => item.name),
        permissions: user.roles.reduce((arr, item) => {
          item.permissions.forEach((permission) => {
            if (arr.indexOf(permission) === -1) {
              arr.push(permission);
            }
          });
          return arr;
        }, []),
      };
      const signPayload = {
        userId: user.id,
        username: user.username,
        roles: user.roles,
      };
      vo.accessToken =
        'bearer ' +
        this.jwtService.sign(signPayload, {
          expiresIn: '30m',
        });
      vo.refreshToken =
        'bearer ' + this.jwtService.sign(signPayload, { expiresIn: '7d' });

      return vo;
    } else {
      return 'login fail';
    }
  }

  @ApiOperation({ summary: '刷新token' })
  @ApiQuery({
    name: 'refreshToken',
    type: String,
    required: true,
    description: '登录接口返回的refreshToken',
  })
  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId);
      const userInfo = {
        userId: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      };

      const access_token = this.jwtService.sign(userInfo, { expiresIn: '30m' });
      const refresh_token = this.jwtService.sign(userInfo, {
        expiresIn: '30m',
      });
      return {
        access_token: 'bearer ' + access_token,
        refresh_token: 'bearer ' + refresh_token,
      };
    } catch (e) {
      throw BusinessException.throwUnauthorization();
    }
  }

  @ApiBearerAuth('bearer')
  @ApiBody({ type: UpdateUserDto })
  @Post(['update', 'admin/update'])
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '修改密码' })
  @Post('updatePassword')
  async updatePassword(
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(updatePasswordDto);
  }

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '修改用户角色' })
  @RequireLogin()
  @RequirePermission('updateUser')
  @Post('changeRole')
  async changeUserRole(@Body(ValidationPipe) changeRoleDto: ChangeRoleDto) {
    await this.userService.changeUserRole(changeRoleDto);
    return '修改用户角色成功';
  }

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '删除用户' })
  @RequireLogin()
  @RequirePermission('deleteUser')
  @Post('delete')
  async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    await this.userService.deleteUserById(deleteUserDto.userId);
    return '删除用户成功';
  }

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '冻结用户' })
  @ApiQuery({
    name: 'id',
    type: Number,
    required: true,
    description: '用户id',
  })
  @Get('freeze')
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }
}
