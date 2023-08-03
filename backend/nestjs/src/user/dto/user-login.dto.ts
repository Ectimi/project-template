import { IsNotEmpty, IsOptional, Length, Validate } from 'class-validator';
import IsEmailCaptchaRequired from '../../decorators/IsEmailCaptchaRequired';

export class UserLoginDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(1, 30)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(1, 50)
  password: string;

  @IsOptional()
  captcha: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmailCaptchaRequired()
  type: 'password' | 'code';
}
