import * as userRepo from '../repositories/user.js';

export const getAll = async () => userRepo.getAll();

export const getById = async id => userRepo.getById(id);

export const create = async user => userRepo.create(user);

export const updateById = async (id, userData) =>
  userRepo.updateById(id, userData);

export const deleteById = async id => userRepo.deleteById(id);