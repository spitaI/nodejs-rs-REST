import { Injectable } from '@nestjs/common';

import User, { IUser, UserResponse } from '../models/user';
import { UserRepository } from '../repositories/user';
import { ADMIN_USER } from '../constants/user';
import { hashPassword } from '../utils/user';

// export const getAll = async (): Promise<ReturnType<typeof userRepo.getAll>> =>
//   userRepo.getAll();

// export const getById = async (
//   id: string
// ): Promise<ReturnType<typeof userRepo.getById>> => userRepo.getById(id);

// export const getByUsername = async (
//   username: string
// ): Promise<ReturnType<typeof userRepo.getByUsername>> =>
//   userRepo.getByUsername(username);

// export const create = async (
//   user: Parameters<typeof userRepo.create>[0]
// ): Promise<ReturnType<typeof userRepo.create>> => {
//   const userWithHashedPassword = await hashPassword(user);
//   return userRepo.create(userWithHashedPassword);
// };

// export const updateById = async (
//   id: string,
//   userData: Parameters<typeof userRepo.updateById>[1]
// ): Promise<ReturnType<typeof userRepo.updateById>> =>
//   userRepo.updateById(id, userData);

// export const deleteById = async (id: string): Promise<boolean> =>
//   userRepo.deleteById(id);

// export const verifyAdminUser = async (): Promise<void> => {
//   const admin = await getByUsername(ADMIN_USER.login);
//   if (!admin) {
//     await create(ADMIN_USER);
//   }
// };

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getAll(): Promise<UserResponse[]> {
    return this.userRepo.getAll();
  }

  async getById(id: string): Promise<UserResponse | null> {
    return User.toResponse(await this.userRepo.find({ id }));
  }

  async getByUsername(username: string): Promise<IUser | null> {
    return this.userRepo.find({
      where: { login: username },
      select: ['id', 'name', 'login', 'password'],
    });
  }

  async create(user: IUser): Promise<UserResponse | null> {
    const userWithHashedPassword = await hashPassword(user);
    const newUser = await this.userRepo.create(userWithHashedPassword);
    return User.toResponse(newUser);
  }

  async updateById(
    id: string,
    userData: Partial<IUser>
  ): Promise<UserResponse | null> {
    return User.toResponse(await this.userRepo.update({ id }, userData));
  }

  async deleteById(id: string): Promise<boolean> {
    return this.userRepo.remove({ id });
  }

  async verifyAdminUser(): Promise<void> {
    const admin = await this.getByUsername(ADMIN_USER.login);
    if (!admin) {
      await this.create(ADMIN_USER);
    }
  }
}
