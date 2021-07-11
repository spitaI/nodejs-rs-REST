import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import Board, { IBoard } from '../models/board';
import { EntityDAO } from '../utils/database';

@Injectable()
export class BoardRepository extends EntityDAO<IBoard> {
  constructor(connection: Connection) {
    const boardRepo = connection.getRepository(Board);
    super(boardRepo);
  }
}
