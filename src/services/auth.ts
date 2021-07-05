import { Injectable } from '@nestjs/common';

import { UserService } from './user';
import { checkPassword } from '../utils/user';
import { getSignedJWTToken } from '../utils/auth';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async logIn({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<string | null> {
    const user = await this.userService.getByUsername(login);
    if (!user) {
      return null;
    }

    const isMatchPassword = await checkPassword(password, user.password);
    if (!isMatchPassword) {
      return null;
    }

    return getSignedJWTToken(user.id as string, user.login);
  }
}
