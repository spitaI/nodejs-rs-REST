import { Injectable } from '@nestjs/common';

import { IBoard } from '../models/board';
import { BoardRepository } from '../repositories/board';

@Injectable()
export class BoardService {
  constructor(private boardRepo: BoardRepository) {}

  async getAll(): Promise<IBoard[]> {
    return this.boardRepo.getAll();
  }

  async getById(id: string): Promise<IBoard | null> {
    return this.boardRepo.find({ id });
  }

  async create(board: IBoard): Promise<IBoard | null> {
    return this.boardRepo.create(board);
  }

  async updateById(id: string, board: Partial<IBoard>): Promise<IBoard | null> {
    return this.boardRepo.update({ id }, board);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.boardRepo.remove({ id });
  }
}
