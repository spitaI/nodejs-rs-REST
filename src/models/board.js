import { v4 as uuidv4 } from 'uuid';

class Board {
  constructor({ id = uuidv4(), title = 'DEFAULT', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(col => ({ ...col, id: uuidv4() }));
  }
}

export default Board;
