import Task from '../models/task.js';
import { getTable } from '../utils/database.js';

const tasksTable = getTable('TASKS');

export const getAll = async boardId => tasksTable.select('boardId', boardId);

export const getById = async (boardId, taskId) =>
  tasksTable.select('boardId', boardId).select('id', taskId)[0] || null;

export const create = async task => tasksTable.create(new Task({ ...task }));

export const updateById = async (boardId, taskId, taskData) => {
  const task = await getById(boardId, taskId);
  return tasksTable.update(task, taskData);
};

export const deleteById = async (boardId, taskId) => {
  const task = await getById(boardId, taskId);
  return tasksTable.remove(task);
};

export const deleteByBoardId = async boardId => {
  const boardTasks = await getAll(boardId);
  const deletedTasks = await Promise.all(
    boardTasks.map(task => tasksTable.remove(task))
  );
  return deletedTasks.every(i => i === true);
};

export const updateOnUserDelete = async userId => {
  const userTasks = tasksTable.select('userId', userId);
  return userTasks.map(task => tasksTable.update(task, { userId: null }));
};
