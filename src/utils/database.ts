const DB = {
  USERS: [],
  BOARDS: [],
  TASKS: [],
};

type FieldValue<T> = T[keyof T];
type DBItem<T> = { [P in keyof T]: FieldValue<T> } & { id?: string };

class TableSelector<T extends DBItem<T>> extends Array<T> {
  select(fieldName: keyof T, fieldValue: FieldValue<T>): TableSelector<T> {
    const result =
      this.filter((item: T) => item[fieldName] === fieldValue) || [];
    return new TableSelector(...result);
  }
}

interface ITableDAO<T extends DBItem<T>> {
  getAll: () => T[];
  select: (fieldName: keyof T, fieldValue: FieldValue<T>) => TableSelector<T>;
  getById: (id: string) => T | null;
  create: (item: T) => T;
  update: (item: T | null, newData: Partial<T>) => T | null;
  updateById: (id: string, newData: Partial<T>) => T | null;
  remove: (item: T | null) => boolean;
  removeById: (id: string) => boolean;
}

const wrapTable = <T extends DBItem<T>>(table: T[]): ITableDAO<T> => {
  const getAll = (): T[] => table;

  const select = (
    fieldName: keyof T,
    fieldValue: FieldValue<T>
  ): TableSelector<T> =>
    new TableSelector(...table).select(fieldName, fieldValue);

  const getById = (id: string): T | null =>
    table.find(item => item?.id === id) || null;

  const create = (item: T): T => {
    table.push(item);
    return item;
  };

  const update = (item: T | null, newData: Partial<T>): T | null => {
    if (!item) return null;

    const newItem = { ...item, ...newData };
    table.splice(table.indexOf(item), 1, newItem);
    return newItem;
  };

  const updateById = (id: string, newData: Partial<T>): T | null => {
    const item = getById(id);
    return update(item, newData);
  };

  const remove = (item: T | null): boolean => {
    if (!item) return false;

    table.splice(table.indexOf(item), 1);
    return true;
  };

  const removeById = (id: string): boolean => {
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

export const getTable = <T extends DBItem<T>>(
  tableName: keyof typeof DB
): ITableDAO<T> => wrapTable<T>(DB[tableName]);
