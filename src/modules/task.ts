import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from '../controllers/task';
import { TaskRepository } from '../repositories/task';
import { TaskService } from '../services/task';
import { BoardModule } from './board';
import { VerifyAuthGuard } from '../guards/verifyAuthGuard';
import Task from '../models/task';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), BoardModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, VerifyAuthGuard],
})
export class TaskModule {}
