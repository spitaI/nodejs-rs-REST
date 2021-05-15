import User from '../models/user.js';
import { getTable } from '../utils/database.js';

const usersTable = getTable('USERS');

export const getAll = async () => usersTable.getAll().map(User.toResponse);

export const getById = async id => User.toResponse(usersTable.getById(id));

export const create = async user =>
  User.toResponse(usersTable.create(new User({ ...user })));

export const updateById = async (id, userData) =>
  User.toResponse(usersTable.updateById(id, userData));

export const deleteById = async id => usersTable.removeById(id);
