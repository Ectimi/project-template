import { SetMetadata } from '@nestjs/common';

const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);

export default RequirePermission;
