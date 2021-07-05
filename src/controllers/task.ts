import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ITask } from '../models/task';
import { TaskService } from '../services/task';
import { TASK_ERRORS } from '../constants/errors';
import { CheckBoardInterceptor } from '../interceptors/boardInterceptor';
import { getValidationInterceptor } from '../interceptors/validationInterceptor';
import { TASK_SCHEMA } from '../constants/validation';
import { VerifyAuthGuard } from '../guards/verifyAuthGuard';

const TaskValidationInterceptor = getValidationInterceptor(TASK_SCHEMA);

@Controller('boards/:boardId/tasks')
@UseGuards(new VerifyAuthGuard())
@UseInterceptors(CheckBoardInterceptor)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll(@Param('boardId') boardId: string): Promise<ITask[]> {
    return this.taskService.getAll(boardId);
  }

  @Post()
  @UseInterceptors(TaskValidationInterceptor)
  async create(
    @Param('boardId') boardId: string,
    @Body() task: ITask
  ): Promise<ITask | null> {
    const newTask = await this.taskService.create({ ...task, boardId });

    if (!newTask) {
      throw new InternalServerErrorException({ message: TASK_ERRORS.HTTP_500 });
    }

    return newTask;
  }

  @Get(':taskId')
  async getById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<ITask | null> {
    const task = await this.taskService.getById(boardId, taskId);

    if (!task) {
      throw new NotFoundException({
        message: TASK_ERRORS.HTTP_404(boardId, taskId),
      });
    }

    return task;
  }

  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() taskData: Partial<ITask>
  ): Promise<ITask | null> {
    const updatedTask = await this.taskService.updateById(
      boardId,
      taskId,
      taskData
    );

    if (!updatedTask) {
      throw new NotFoundException({
        message: TASK_ERRORS.HTTP_404(boardId, taskId),
      });
    }

    return updatedTask;
  }

  @Delete(':taskId')
  async delete(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<boolean> {
    const isTaskDeleted = await this.taskService.deleteById(boardId, taskId);

    if (!isTaskDeleted) {
      throw new NotFoundException({
        message: TASK_ERRORS.HTTP_404(boardId, taskId),
      });
    }

    return isTaskDeleted;
  }
}
