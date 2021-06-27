import * as userRepo from '../repositories/user';

export const getAll = async (): Promise<ReturnType<typeof userRepo.getAll>> =>
  userRepo.getAll();

export const getById = async (
  id: string
): Promise<ReturnType<typeof userRepo.getById>> => userRepo.getById(id);

export const create = async (
  user: Parameters<typeof userRepo.create>[0]
): Promise<ReturnType<typeof userRepo.create>> => userRepo.create(user);

export const updateById = async (
  id: string,
  userData: Parameters<typeof userRepo.updateById>[1]
): Promise<ReturnType<typeof userRepo.updateById>> =>
  userRepo.updateById(id, userData);

export const deleteById = async (id: string): Promise<boolean> =>
  userRepo.deleteById(id);
