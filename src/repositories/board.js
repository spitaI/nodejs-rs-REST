import Board from '../models/board.js';
import { getTable } from '../utils/database.js';

const boardsTable = getTable('BOARDS');

export const getAll = async () => boardsTable.getAll();

export const getById = async id => boardsTable.getById(id);

export const create = async board =>
  boardsTable.create(new Board({ ...board }));

export const updateById = async (id, boardData) =>
  boardsTable.updateById(id, boardData);

export const deleteById = async id => boardsTable.removeById(id);
