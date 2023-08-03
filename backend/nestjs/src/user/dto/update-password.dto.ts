import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(1, 50)
  newPassword: string;

  @IsNotEmpty()
  @Length(6)
  captcha: string;
}
