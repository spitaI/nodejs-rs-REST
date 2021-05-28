import Board from '../models/board.js';
import { getTable } from '../utils/database.js';

const boardsTable = getTable('BOARDS');

/**
 * Get all boards
 * @returns {Promise<object[]>} All boards
 */
export const getAll = async () => boardsTable.getAll();

/**
 * Get board by id
 * @param {string} id - The id of the board
 * @returns {Promise<object | null>} Board by id, or null if not found
 */
export const getById = async id => boardsTable.getById(id);

/**
 * Add new board to table
 * @param {object} board - The board to add to table
 * @returns {Promise<object>} Newly created board
 */
export const create = async board =>
  boardsTable.create(new Board({ ...board }));

/**
 * Update board by id
 * @param {string} id - The id of the board to update
 * @param {object} boardData - The new board data
 * @returns {Promise<object | null>} Updated board, or null if not found
 */
export const updateById = async (id, boardData) =>
  boardsTable.updateById(id, boardData);

/**
 * Delete board by id
 * @param {string} id - The id of the board to delete
 * @returns {Promise<boolean>} Whether board was deleted or not
 */
export const deleteById = async id => boardsTable.removeById(id);
