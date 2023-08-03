import { Controller, Get, Inject, Query, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';
import { CaptchaDto, EmailVerifyType } from './dto/captcha.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private redisService: RedisService;

  @Get('code')
  async sendEmailCode(@Query(new ValidationPipe()) captchaDto: CaptchaDto) {
    const code = Math.random().toString().slice(2, 8);
    const { email, type } = captchaDto;
    const cacheKey = `captcha_${type}_${email}`;

    const isCached = await this.redisService.get(cacheKey);
    if (isCached) {
      return '验证码已发送，有效期是5分钟，请不要频繁发送!';
    }

    if (type === EmailVerifyType.Register) {
    }

    await this.redisService.set(cacheKey, code, 5 * 60);

    await this.emailService.sendMail({
      to: email,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 <strong>${code}</strong></p>`,
    });

    return '发送成功';
  }
}
