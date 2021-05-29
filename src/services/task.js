/**
 * @module TaskService
 * @category Task
 */

import * as taskRepo from '../repositories/task.js';

/** @typedef {import('../models/task.js').Task} Task */

/**
 * Get all tasks associated with given board from data store
 * @param {string} boardId - The id of the board associated with the tasks
 * @returns {Promise<Task[]>} All tasks associated with given board
 */
const getAll = async boardId => taskRepo.getAll(boardId);

/**
 * Get task by id in the given board from data store
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @returns {Promise<Task | null>} Task by id in the given board, or null if not found
 */
const getById = async (boardId, taskId) => taskRepo.getById(boardId, taskId);

/**
 * Add new task to data store
 * @param {object} task - The task to add to data store
 * @returns {Promise<Task>} Newly created task
 */
const create = async task => taskRepo.create(task);

/**
 * Update task by id in the given board in data store
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @param {object} taskData - The new task data
 * @returns {Promise<Task | null>} Updated task, or null if not found
 */
const updateById = async (boardId, taskId, taskData) =>
  taskRepo.updateById(boardId, taskId, taskData);

/**
 * Delete task by id in the given board from data store
 * @param {string} boardId - The id of the board associated with the task
 * @param {string} taskId - The id of the task in the given board
 * @returns {Promise<boolean>} Whether task was deleted or not
 */
const deleteById = async (boardId, taskId) =>
  taskRepo.deleteById(boardId, taskId);

/**
 * Delete all tasks associated with given board
 * @param {string} boardId - The id of the board associated with the tasks
 * @returns {Promise<boolean>} Whether all tasks were deleted or not
 */
const deleteByBoardId = async boardId => taskRepo.deleteByBoardId(boardId);

/**
 * Update tasks associated with given user on user deletion
 * @param {string} userId - The id of the user associated with the tasks
 * @returns {Promise<Task[]>} Array of updated tasks
 */
const updateOnUserDelete = async userId => taskRepo.updateOnUserDelete(userId);

export {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  deleteByBoardId,
  updateOnUserDelete,
};
