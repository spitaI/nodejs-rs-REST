import User, { IUser, UserResponse } from '../models/user';
import { getEntityDAO } from '../utils/database';

const userDAO = getEntityDAO<IUser>(User);

export const getAll = async (): Promise<UserResponse[]> => userDAO.getAll();

export const getById = async (id: string): Promise<UserResponse | null> =>
  userDAO.getById({ id });

export const create = async (user: IUser): Promise<UserResponse | null> =>
  User.toResponse(await userDAO.create(user));

export const updateById = async (
  id: string,
  userData: Partial<IUser>
): Promise<UserResponse | null> => userDAO.update({ id }, userData);

export const deleteById = async (id: string): Promise<boolean> =>
  userDAO.remove({ id });
