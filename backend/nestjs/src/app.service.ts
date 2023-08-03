import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  @InjectEntityManager()
  entityManager: EntityManager;

  getHello(): string {
    return 'Hello World!';
  }
}
