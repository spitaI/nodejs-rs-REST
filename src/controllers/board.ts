import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { IBoard } from '../models/board';
import { BoardService } from '../services/board';
import { VerifyAuthGuard } from '../guards/verifyAuthGuard';
import { getValidationInterceptor } from '../interceptors/validationInterceptor';
import { BOARD_SCHEMA } from '../constants/validation';
import { BOARD_ERRORS } from '../constants/errors';

const BoardValidationInterceptor = getValidationInterceptor(BOARD_SCHEMA);

@Controller('boards')
@UseGuards(new VerifyAuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getAll(): Promise<IBoard[]> {
    return this.boardService.getAll();
  }

  @Post()
  @UseInterceptors(BoardValidationInterceptor)
  async create(@Body() board: IBoard): Promise<IBoard | null> {
    const newBoard = await this.boardService.create(board);

    if (!newBoard) {
      throw new InternalServerErrorException({
        message: BOARD_ERRORS.HTTP_500,
      });
    }

    return newBoard;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<IBoard | null> {
    const board = await this.boardService.getById(id);

    if (!board) {
      throw new NotFoundException({ message: BOARD_ERRORS.HTTP_404(id) });
    }

    return board;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() boardData: Partial<IBoard>
  ): Promise<IBoard | null> {
    const updatedBoard = await this.boardService.updateById(id, boardData);

    if (!updatedBoard) {
      throw new NotFoundException({ message: BOARD_ERRORS.HTTP_404(id) });
    }

    return updatedBoard;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string): Promise<void> {
    const isBoardDeleted = await this.boardService.deleteById(id);

    if (!isBoardDeleted) {
      throw new NotFoundException({ message: BOARD_ERRORS.HTTP_404(id) });
    }
  }
}
