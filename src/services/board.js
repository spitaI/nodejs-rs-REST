import * as boardRepo from '../repositories/board.js';

export const getAll = async () => boardRepo.getAll();

export const getById = async id => boardRepo.getById(id);

export const create = async board => boardRepo.create(board);

export const updateById = async (id, boardData) =>
  boardRepo.updateById(id, boardData);

export const deleteById = async id => boardRepo.deleteById(id);