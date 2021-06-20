import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserResponse = Omit<IUser, 'password'>;

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text')
  login!: string;

  @Column('text', { select: false })
  password!: string;

  static toResponse(user: IUser | null): UserResponse | null {
    if (!user) return null;

    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
