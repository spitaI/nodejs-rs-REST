import { Injectable } from '@nestjs/common';

import User, { IUser, UserResponse } from '../models/user';
import { UserRepository } from '../repositories/user';
import { ADMIN_USER } from '../constants/user';
import { hashPassword } from '../utils/user';

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
