import bcrypt from 'bcryptjs';

import { IUser } from '../models/user';

const SALT_ROUNDS = 10;

export const hashPassword = async (user: IUser): Promise<IUser> => {
  const { password } = user;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { ...user, password: hashedPassword };
};
