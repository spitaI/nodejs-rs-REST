import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardController } from '../controllers/board';
import { BoardRepository } from '../repositories/board';
import { BoardService } from '../services/board';
import Board from '../models/board';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  exports: [BoardService],
})
export class BoardModule {}
