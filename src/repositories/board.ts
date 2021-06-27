import Board, { IBoard } from '../models/board';
import { getEntityDAO } from '../utils/database';

const boardDAO = getEntityDAO<IBoard>(Board);

export const getAll = async (): Promise<IBoard[]> => boardDAO.getAll();

export const getById = async (id: string): Promise<IBoard | null> =>
  boardDAO.find({ id });

export const create = async (board: IBoard): Promise<IBoard | null> =>
  boardDAO.create(board);

export const updateById = async (
  id: string,
  boardData: Partial<IBoard>
): Promise<IBoard | null> => boardDAO.update({ id }, boardData);

export const deleteById = async (id: string): Promise<boolean> =>
  boardDAO.remove({ id });
