import { IsNotEmpty } from 'class-validator';
import ArrayNotContainWhitespace from '../../decorators/ArrayNotContainWhitespace';

export class ChangeRoleDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @ArrayNotContainWhitespace()
  roleIds: number[];
}
