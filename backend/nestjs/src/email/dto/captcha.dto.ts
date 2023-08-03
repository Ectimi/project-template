import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EmailVerifyType {
  Login = 'Login',
  Register = 'Register',
  UpdatePassword = 'UpdatePassword',
}

export class CaptchaDto {
  @ApiProperty({ name: 'email', type: String })
  @IsNotEmpty()
  @IsEmail({}, { message: '邮箱不正确' })
  email: string;

  @ApiProperty({ name: 'type', enum: EmailVerifyType })
  @IsNotEmpty()
  @IsEnum(EmailVerifyType, { message: '类型参数不正确' })
  type: EmailVerifyType;
}
