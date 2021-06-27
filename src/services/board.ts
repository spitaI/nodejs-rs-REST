import * as boardRepo from '../repositories/board';

export const getAll = async (): Promise<ReturnType<typeof boardRepo.getAll>> =>
  boardRepo.getAll();

export const getById = async (
  id: string
): Promise<ReturnType<typeof boardRepo.getById>> => boardRepo.getById(id);

export const create = async (
  board: Parameters<typeof boardRepo.create>[0]
): Promise<ReturnType<typeof boardRepo.create>> => boardRepo.create(board);

export const updateById = async (
  id: string,
  boardData: Parameters<typeof boardRepo.updateById>[1]
): Promise<ReturnType<typeof boardRepo.updateById>> =>
  boardRepo.updateById(id, boardData);

export const deleteById = async (id: string): Promise<boolean> =>
  boardRepo.deleteById(id);
