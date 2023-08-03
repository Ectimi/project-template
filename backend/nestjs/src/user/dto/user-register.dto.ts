import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({ name: 'username' })
  @IsNotEmpty()
  @Length(1, 30)
  username: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  @Length(1, 50)
  password: string;

  @ApiProperty({ name: 'email' })
  @Length(1, 100)
  email: string;

  @ApiProperty({ name: 'captcha' })
  @IsNotEmpty()
  @Length(6)
  captcha: string;
}
