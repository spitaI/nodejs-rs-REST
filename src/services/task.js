import * as taskRepo from '../repositories/task.js';

export const getAll = async boardId => taskRepo.getAll(boardId);

export const getById = async (boardId, taskId) =>
  taskRepo.getById(boardId, taskId);

export const create = async task => taskRepo.create(task);

export const updateById = async (boardId, taskId, taskData) =>
  taskRepo.updateById(boardId, taskId, taskData);

export const deleteById = async (boardId, taskId) =>
  taskRepo.deleteById(boardId, taskId);

export const deleteByBoardId = async boardId =>
  taskRepo.deleteByBoardId(boardId);

export const updateOnUserDelete = async userId =>
  taskRepo.updateOnUserDelete(userId);
