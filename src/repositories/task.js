import Task from '../models/task.js';
import { getTable } from '../utils/database.js';

const tasksTable = getTable('TASKS');

/**
 * Get all tasks associated with given board
 * @param {string} boardId - The id of the board associated with the tasks
 * @returns {Promise<object[]>} All tasks associated with given board
 */
export const getAll = async boardId => tasksTable.select('boardId', boardId);

/**
 * Get task by id in the given board
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @returns {Promise<object | null>} Task by id in the given board, or null if not found
 */
export const getById = async (boardId, taskId) =>
  tasksTable.select('boardId', boardId).select('id', taskId)[0] || null;

/**
 * Add new task to table
 * @param {object} task - The task to add to table
 * @returns {Promise<object>} Newly created task
 */
export const create = async task => tasksTable.create(new Task({ ...task }));

/**
 * Update task by id in the given board
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @param {object} taskData - The new task data
 * @returns {Promise<object | null>} Updated task, or null if not found
 */
export const updateById = async (boardId, taskId, taskData) => {
  const task = await getById(boardId, taskId);
  return tasksTable.update(task, taskData);
};

/**
 * Delete task by id in the given board
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @returns {Promise<boolean>} Whether task was deleted or not
 */
export const deleteById = async (boardId, taskId) => {
  const task = await getById(boardId, taskId);
  return tasksTable.remove(task);
};

/**
 * Delete all tasks associated with given board
 * @param {string} boardId - The id of the board associated with the tasks
 * @returns {Promise<boolean>} Whether all tasks were deleted or not
 */
export const deleteByBoardId = async boardId => {
  const boardTasks = await getAll(boardId);
  const deletedTasks = await Promise.all(
    boardTasks.map(task => tasksTable.remove(task))
  );
  return deletedTasks.every(i => i === true);
};

/**
 * Update tasks associated with given user on user deletion
 * @param {string} userId - The id of the user associated with the tasks
 * @returns {Promise<object[]>} Array of updated tasks
 */
export const updateOnUserDelete = async userId => {
  const userTasks = tasksTable.select('userId', userId);
  return userTasks.map(task => tasksTable.update(task, { userId: null }));
};
