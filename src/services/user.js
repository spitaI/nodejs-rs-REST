import * as userRepo from '../repositories/user.js';
import * as taskService from './task.js';

/**
 * Get all users from data store
 * @returns {Promise<object[]>} All users
 */
export const getAll = async () => userRepo.getAll();

/**
 * Get user by id from data store
 * @param {string} id - The id of the user
 * @returns {Promise<object | null>} User by id, or null if not found
 */
export const getById = async id => userRepo.getById(id);

/**
 * Add new user to data store
 * @param {object} user - The user to add to data store
 * @returns {Promise<object>} Newly created user
 */
export const create = async user => userRepo.create(user);

/**
 * Update user by id in data store
 * @param {string} id - The id of the user to update
 * @param {object} userData - The new user data
 * @returns {Promise<object | null>} Updated user, or null if not found
 */
export const updateById = async (id, userData) =>
  userRepo.updateById(id, userData);

/**
 * Delete user by id from data store
 * @param {string} id - The id of the user to delete
 * @returns {Promise<boolean>} Whether user was deleted or not
 */
export const deleteById = async id => {
  await taskService.updateOnUserDelete(id);
  return userRepo.deleteById(id);
};
