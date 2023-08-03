import * as process from 'process';
import * as crypto from 'crypto';
import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export const isProduction = process.env.NODE_ENV === 'production';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export function generateParseIntPipe(name) {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new BadRequestException(name + ' 应该传数字');
    },
  });
}
