import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { BOARD_ERRORS } from '../constants/errors';
import { BoardService } from '../services/board';

@Injectable()
export class CheckBoardInterceptor implements NestInterceptor {
  constructor(private boardService: BoardService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<void>> {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();

    const { boardId = '' } = req.params;
    const board = await this.boardService.getById(boardId);

    if (!board) {
      throw new NotFoundException({ message: BOARD_ERRORS.HTTP_404(boardId) });
    }

    return next.handle();
  }
}
