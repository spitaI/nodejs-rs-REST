import * as userRepo from '../repositories/user';
import { hashPassword } from '../utils/user';

export const getAll = async (): Promise<ReturnType<typeof userRepo.getAll>> =>
  userRepo.getAll();

export const getById = async (
  id: string
): Promise<ReturnType<typeof userRepo.getById>> => userRepo.getById(id);

export const getByUsername = async (
  username: string
): Promise<ReturnType<typeof userRepo.getByUsername>> =>
  userRepo.getByUsername(username);

export const create = async (
  user: Parameters<typeof userRepo.create>[0]
): Promise<ReturnType<typeof userRepo.create>> => {
  const userWithHashedPassword = await hashPassword(user);
  return userRepo.create(userWithHashedPassword);
};

export const updateById = async (
  id: string,
  userData: Parameters<typeof userRepo.updateById>[1]
): Promise<ReturnType<typeof userRepo.updateById>> =>
  userRepo.updateById(id, userData);

export const deleteById = async (id: string): Promise<boolean> =>
  userRepo.deleteById(id);
