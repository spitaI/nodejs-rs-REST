import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import Task, { ITask } from '../models/task';
import { EntityDAO } from '../utils/database';

@Injectable()
export class TaskRepository extends EntityDAO<ITask> {
  constructor(connection: Connection) {
    const taskRepo = connection.getRepository(Task);
    super(taskRepo);
  }
}
