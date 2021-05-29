import Board, { IBoard } from '../models/board';
import { getTable } from '../utils/database';

const boardsTable = getTable<IBoard>('BOARDS');

export const getAll = async (): Promise<IBoard[]> => boardsTable.getAll();

export const getById = async (id: string): Promise<IBoard | null> =>
  boardsTable.getById(id);

export const create = async (board: IBoard): Promise<IBoard> =>
  boardsTable.create(new Board({ ...board }));

export const updateById = async (
  id: string,
  boardData: Partial<IBoard>
): Promise<IBoard | null> => boardsTable.updateById(id, boardData);

export const deleteById = async (id: string): Promise<boolean> =>
  boardsTable.removeById(id);
