import { IsNotEmpty } from 'class-validator';
import ArrayNotContainWhitespace from '../../decorators/ArrayNotContainWhitespace';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ArrayNotContainWhitespace()
  permissions: string[];
}
