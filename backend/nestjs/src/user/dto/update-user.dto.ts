import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ name: 'headPic', type: String, required: false })
  @IsOptional()
  @IsNotEmpty()
  headPic: string;

  @ApiProperty({ name: 'nickName', type: String, required: false })
  @IsOptional()
  @IsNotEmpty()
  nickName: string;
}
