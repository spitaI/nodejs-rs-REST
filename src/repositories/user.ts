import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import User, { IUser } from '../models/user';
import { EntityDAO } from '../utils/database';

@Injectable()
export class UserRepository extends EntityDAO<IUser> {
  constructor(connection: Connection) {
    const userRepo = connection.getRepository(User);
    super(userRepo);
  }
}
