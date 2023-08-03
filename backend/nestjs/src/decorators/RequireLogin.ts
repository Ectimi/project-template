import { SetMetadata } from '@nestjs/common';

const RequireLogin = () => SetMetadata('require-login', true);

export default RequireLogin;
