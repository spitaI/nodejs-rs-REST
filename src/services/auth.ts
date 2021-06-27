import * as userService from './user';
import { checkPassword } from '../utils/user';
import { getSignedJWTToken } from '../utils/auth';

export const logIn = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}): Promise<string | null> => {
  const user = await userService.getByUsername(login);
  if (!user) {
    return null;
  }

  const isMatchPassword = await checkPassword(password, user.password);
  if (!isMatchPassword) {
    return null;
  }

  return getSignedJWTToken(user.id as string, user.login);
};
