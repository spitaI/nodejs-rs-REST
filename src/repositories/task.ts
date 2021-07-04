import Task, { ITask } from '../models/task';
import { getEntityDAO } from '../utils/database';

const taskDAO = getEntityDAO<ITask>(Task);

export const getAll = async (boardId: string): Promise<ITask[]> =>
  taskDAO.getAll({
    where: { boardId },
    relations: ['boardId', 'userId'],
    loadRelationIds: true,
  });

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask | null> =>
  taskDAO.find({
    where: { id: taskId, boardId },
    relations: ['boardId', 'userId'],
    loadRelationIds: true,
  });

export const create = async (task: ITask): Promise<ITask | null> =>
  taskDAO.create(task);

export const updateById = async (
  boardId: string,
  taskId: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => taskDAO.update({ id: taskId, boardId }, taskData);

export const deleteById = async (
  boardId: string,
  taskId: string
): Promise<boolean> => taskDAO.remove({ id: taskId, boardId });
