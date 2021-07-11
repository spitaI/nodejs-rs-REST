import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from '../controllers/auth';
import { UserModule } from './user';
import { AuthService } from '../services/auth';
import User from '../models/user';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
