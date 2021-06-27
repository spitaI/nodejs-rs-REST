import * as taskRepo from '../repositories/task';

export const getAll = async (
  boardId: string
): Promise<ReturnType<typeof taskRepo.getAll>> => taskRepo.getAll(boardId);

export const getById = async (
  boardId: string,
  taskId: string
): Promise<ReturnType<typeof taskRepo.getById>> =>
  taskRepo.getById(boardId, taskId);

export const create = async (
  task: Parameters<typeof taskRepo.create>[0]
): Promise<ReturnType<typeof taskRepo.create>> => taskRepo.create(task);

export const updateById = async (
  boardId: string,
  taskId: string,
  taskData: Parameters<typeof taskRepo.updateById>[2]
): Promise<ReturnType<typeof taskRepo.updateById>> =>
  taskRepo.updateById(boardId, taskId, taskData);

export const deleteById = async (
  boardId: string,
  taskId: string
): Promise<boolean> => taskRepo.deleteById(boardId, taskId);
