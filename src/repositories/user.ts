import User, { IUser, UserResponse } from '../models/user';
import { getTable } from '../utils/database';

const usersTable = getTable<IUser>('USERS');

export const getAll = async (): Promise<(UserResponse | null)[]> =>
  usersTable.getAll().map(User.toResponse);

export const getById = async (id: string): Promise<UserResponse | null> =>
  User.toResponse(usersTable.getById(id));

export const create = async (user: IUser): Promise<UserResponse | null> =>
  User.toResponse(usersTable.create(new User({ ...user })));

export const updateById = async (
  id: string,
  userData: Partial<IUser>
): Promise<UserResponse | null> =>
  User.toResponse(usersTable.updateById(id, userData));

export const deleteById = async (id: string): Promise<boolean> =>
  usersTable.removeById(id);
