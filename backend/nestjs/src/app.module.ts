import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoginGuard } from './guards/login.guard';
import { PermissionGuard } from './guards/permission.guard';
import { RedisModule } from './redis/redis.module';
import { WinstonModule } from 'nest-winston';
import { BeforeRequestInterceptor } from './interceptors/beforeRequest.interceptor';
import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { AllExceptionsFilter } from './filters/base.exception.filter';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { EmailModule } from './email/email.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';


const { format, transports } = winston;

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),

        format.splat(),
        format.printf((info) => {
          const level = info[Symbol.for('level')];
          const data = info[Symbol.for('splat')];
          const message = info.message;
          return `${level} ${info.timestamp} : ${message} \n  ${JSON.stringify(
            data,
          )}`;
        }),
      ),
      transports: [
        new transports.Console({ level: 'info' }),
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      // imports: [
      //   ConfigModule.forRoot({
      //     cache: true,
      //     isGlobal: true,
      //     load: [config],
      //   }),
      // ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host'),
        port: configService.get<number>('db.mysql.port'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        synchronize: true,
        logging: true,
        entities: ['dist/**/**.entity{.ts,.js}'],
        poolSize: 10,
        connectorPackage: 'mysql2',
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: 'this is a secret',
      signOptions: {
        expiresIn: '30m',
      },
    }),
    UserModule,
    RedisModule,
    EmailModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BeforeRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
