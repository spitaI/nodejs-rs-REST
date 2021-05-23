const DB = {
  USERS: [],
  BOARDS: [],
  TASKS: [],
};

class TableSelector extends Array {
  select(fieldName, fieldValue) {
    const result = this.filter(item => item?.[fieldName] === fieldValue) || [];
    return new TableSelector(...result);
  }
}

const wrapTable = table => {
  const getAll = () => table;

  const select = (fieldName, fieldValue) =>
    new TableSelector(...table).select(fieldName, fieldValue);

  const getById = id => table.find(item => item?.id === id) || null;

  const create = item => {
    table.push(item);
    return item;
  };

  const update = (item, newData) => {
    if (!item) return null;

    const newItem = { ...item, ...newData };
    table.splice(table.indexOf(item), 1, newItem);
    return newItem;
  };

  const updateById = (id, newData) => {
    const item = getById(id);
    return update(item, newData);
  };

  const remove = item => {
    if (!item) return false;

    table.splice(table.indexOf(item), 1);
    return true;
  };

  const removeById = id => {
    const item = getById(id);
    return remove(item);
  };

  return {
    getAll,
    create,
    getById,
    update,
    updateById,
    remove,
    removeById,
    select,
  };
};

export const getTable = tableName =>
  DB[tableName] ? wrapTable(DB[tableName]) : null;
