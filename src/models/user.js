/**
 * @module UserModel
 * @category User
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef User
 * @type {object}
 * @property {string} id
 * @property {string} name
 * @property {string} login
 * @property {string} password
 */

/** Class representing a user */
class User {
  /**
   * Create a user
   * @param {object} options - The user options
   * @param {string} options.id - The user id
   * @param {string} options.name - The user name
   * @param {string} options.login - The user login
   * @param {string} options.password - The user password
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Removes password from user model for HTTP-response
   * @param {{ id: string, name: string, login: string, password: string }} user - The user model
   * @returns {{ id: string, name: string, login: string }} User model excluding password
   */
  static toResponse(user) {
    if (!user) return null;

    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
