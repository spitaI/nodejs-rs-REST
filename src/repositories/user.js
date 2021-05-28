import User from '../models/user.js';
import { getTable } from '../utils/database.js';

const usersTable = getTable('USERS');

/**
 * Get all users
 * @returns {Promise<object[]>} All users
 */
export const getAll = async () => usersTable.getAll().map(User.toResponse);

/**
 * Get user by id
 * @param {string} id - The id of the user
 * @returns {Promise<object | null>} User by id, or null if not found
 */
export const getById = async id => User.toResponse(usersTable.getById(id));

/**
 * Add new user to table
 * @param {object} user - The user to add to table
 * @returns {Promise<object>} Newly created user
 */
export const create = async user =>
  User.toResponse(usersTable.create(new User({ ...user })));

/**
 * Update user by id
 * @param {string} id - The id of the user to update
 * @param {object} userData - The new user data
 * @returns {Promise<object | null>} Updated user, or null if not found
 */
export const updateById = async (id, userData) =>
  User.toResponse(usersTable.updateById(id, userData));

/**
 * Delete user by id
 * @param {string} id - The id of the user to delete
 * @returns {Promise<boolean>} Whether user was deleted or not
 */
export const deleteById = async id => usersTable.removeById(id);
