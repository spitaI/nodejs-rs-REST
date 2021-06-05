import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserResponse = Omit<IUser, 'password'>;

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser | null): UserResponse | null {
    if (!user) return null;

    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
