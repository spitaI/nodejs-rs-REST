import User from '../models/user.js';
import { getTable } from '../utils/database.js';

const usersTable = getTable('USERS');

export const getAll = async () => usersTable.getAll();

export const getById = async id => usersTable.getById(id);

export const create = async user => usersTable.create(new User({ ...user }));

export const updateById = async (id, userData) =>
  usersTable.updateById(id, userData);

export const deleteById = async id => usersTable.removeById(id);
