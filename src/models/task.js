import { v4 as uuidv4 } from 'uuid';

/** Class representing a task */
class Task {
  /**
   * Create a task
   * @param {object} options - The task options
   * @param {string} options.id - The task id
   * @param {string} options.title - The task title
   * @param {number} options.order - The task order in a column
   * @param {string} options.description - The task description
   * @param {string} options.userId - The user id related to task
   * @param {string} options.boardId - The board id related to task
   * @param {string} options.columnId - The column id related to task
   */
  constructor({
    id = uuidv4(),
    title = 'DEFAULT',
    order = 0,
    description = '',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
