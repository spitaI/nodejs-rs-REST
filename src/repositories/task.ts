import Task, { ITask } from '../models/task';
import { getTable } from '../utils/database';

const tasksTable = getTable<ITask>('TASKS');

export const getAll = async (boardId: string): Promise<ITask[]> =>
  tasksTable.select('boardId', boardId);

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask | null> =>
  tasksTable.select('boardId', boardId).select('id', taskId)[0] || null;

export const create = async (task: ITask): Promise<ITask> =>
  tasksTable.create(new Task({ ...task }));

export const updateById = async (
  boardId: string,
  taskId: string,
  taskData: Partial<ITask>
): Promise<ITask | null> => {
  const task = await getById(boardId, taskId);
  return tasksTable.update(task, taskData);
};

export const deleteById = async (
  boardId: string,
  taskId: string
): Promise<boolean> => {
  const task = await getById(boardId, taskId);
  return tasksTable.remove(task);
};

export const deleteByBoardId = async (boardId: string): Promise<boolean> => {
  const boardTasks = await getAll(boardId);
  const deletedTasks = await Promise.all(
    boardTasks.map(task => tasksTable.remove(task))
  );
  return deletedTasks.every(i => i === true);
};

export const updateOnUserDelete = async (
  userId: string
): Promise<(ITask | null)[]> => {
  const userTasks = tasksTable.select('userId', userId);
  return userTasks.map(task => tasksTable.update(task, { userId: null }));
};
