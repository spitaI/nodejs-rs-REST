import { Injectable } from '@nestjs/common';

import { ITask } from '../models/task';
import { TaskRepository } from '../repositories/task';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async getAll(boardId: string): Promise<ITask[]> {
    return this.taskRepo.getAll({
      where: { boardId },
      relations: ['boardId', 'userId'],
      loadRelationIds: true,
    });
  }

  async getById(boardId: string, taskId: string): Promise<ITask | null> {
    return this.taskRepo.find({
      where: { id: taskId, boardId },
      relations: ['boardId', 'userId'],
      loadRelationIds: true,
    });
  }

  async create(task: ITask): Promise<ITask | null> {
    return this.taskRepo.create(task);
  }

  async updateById(
    boardId: string,
    taskId: string,
    taskData: Partial<ITask>
  ): Promise<ITask | null> {
    return this.taskRepo.update({ id: taskId, boardId }, taskData);
  }

  async deleteById(boardId: string, taskId: string): Promise<boolean> {
    return this.taskRepo.remove({ id: taskId, boardId });
  }
}
