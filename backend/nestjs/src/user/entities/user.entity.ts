import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  username: string;

  @Column({
    length: 50,
  })
  password: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    name: 'nick_name',
    length: 50,
    comment: '昵称',
  })
  nickName: string;

  @Column({
    comment: '头像',
    length: 100,
    nullable: true,
  })
  headPic: string;

  @Column({ default: false })
  isFrozen: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[];

  @BeforeInsert()
  generateNickname() {
    if (!this.nickName) {
      this.nickName = `用户_${randomStringGenerator()}`;
    }
  }
}
