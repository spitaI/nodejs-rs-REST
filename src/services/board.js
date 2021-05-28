import * as boardRepo from '../repositories/board.js';
import * as taskService from './task.js';

/**
 * @typedef {import('../models/board.js').Board} Board
 */

/**
 * Get all boards from data store
 * @returns {Promise<Board[]>} All boards
 */
export const getAll = async () => boardRepo.getAll();

/**
 * Get board by id from data store
 * @param {string} id - The id of the board
 * @returns {Promise<Board | null>} Board by id, or null if not found
 */
export const getById = async id => boardRepo.getById(id);

/**
 * Add new board to data store
 * @param {object} board - The board to add to data store
 * @returns {Promise<Board>} Newly created board
 */
export const create = async board => boardRepo.create(board);

/**
 * Update board by id in data store
 * @param {string} id - The id of the board to update
 * @param {object} boardData - The new board data
 * @returns {Promise<Board | null>} Updated board, or null if not found
 */
export const updateById = async (id, boardData) =>
  boardRepo.updateById(id, boardData);

/**
 * Delete board by id from data store
 * @param {string} id - The id of the board to delete
 * @returns {Promise<boolean>} Whether board was deleted or not
 */
export const deleteById = async id => {
  await taskService.deleteByBoardId(id);
  return boardRepo.deleteById(id);
};
