import { v4 as uuidv4 } from 'uuid';

/** Class representing a board */
class Board {
  /**
   * Create a board
   * @param {object} options - The board options
   * @param {string} options.id - The board id
   * @param {string} options.title - The board title
   * @param {Array.<{ id: string, title: string, order: number }>} options.columns - The board columns
   */
  constructor({ id = uuidv4(), title = 'DEFAULT', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(col => ({ id: uuidv4(), ...col }));
  }
}

export default Board;
