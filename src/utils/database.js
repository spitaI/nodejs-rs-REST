/**
 * @module Database
 * @category Utils
 */

const DB = {
  USERS: [],
  BOARDS: [],
  TASKS: [],
};

/**
 * @typedef {object} HelperFunctionsObject
 * @property {function(): object[]} getAll
 * @property {function(string, (string | number | boolean)): TableSelector} select
 * @property {function(string): object | null} getById
 * @property {function(object): object} create
 * @property {function(object, object): object | null} update
 * @property {function(string, object): object | null} updateById
 * @property {function(object): boolean} remove
 * @property {function(string): boolean} removeById
 */

/** Class extending the Array for usage of selecting elements by the value of some field */
class TableSelector extends Array {
  /**
   * Selects elements by the value of given field
   * @param {string} fieldName - The name of the field to be selected by
   * @param {string | number | boolean} fieldValue - The field value to test
   * @returns {TableSelector} TableSelector instance containing objects where given field equals to given value
   */
  select(fieldName, fieldValue) {
    const result = this.filter(item => item?.[fieldName] === fieldValue) || [];
    return new TableSelector(...result);
  }
}

/**
 * Wrapping database table with helper functions
 * @param {object[]} table - The table of the database
 * @returns {HelperFunctionsObject} Helper functions for working with database table
 */
const wrapTable = table => {
  /**
   * Get all elements of the table
   * @returns {object[]} Table
   */
  const getAll = () => table;

  /**
   * Selects table elements by the value of given field
   * @param {string} fieldName - The name of the field to be selected by
   * @param {string | number | boolean} fieldValue - The field value to test
   * @returns {TableSelector} TableSelector instance containing objects where given field equals to given value
   */
  const select = (fieldName, fieldValue) =>
    new TableSelector(...table).select(fieldName, fieldValue);

  /**
   * Get an element of the table by its id
   * @param {string} id - The id of the element
   * @returns {object | null} Element with given id, or null if not found
   */
  const getById = id => table.find(item => item?.id === id) || null;

  /**
   * Create new element in the table
   * @param {object} item - Item to save to the table
   * @returns {object} Newly created element
   */
  const create = item => {
    table.push(item);
    return item;
  };

  /**
   * Updates given table element with new data
   * @param {object} item - The element to update
   * @param {object} newData - The new data
   * @returns {object | null} Updated element, or null if no element provided
   */
  const update = (item, newData) => {
    if (!item) return null;

    const newItem = { ...item, ...newData };
    table.splice(table.indexOf(item), 1, newItem);
    return newItem;
  };

  /**
   * Updates table element by its id with new data
   * @param {string} id - The id of the element to update
   * @param {object} newData - The new data
   * @returns {object | null} Updated element, or null if not found
   */
  const updateById = (id, newData) => {
    const item = getById(id);
    return update(item, newData);
  };

  /**
   * Removes given element from the table
   * @param {object} item - The element to remove
   * @returns {boolean} Whether element was removed or not
   */
  const remove = item => {
    if (!item) return false;

    table.splice(table.indexOf(item), 1);
    return true;
  };

  /**
   * Removes given element from the table by its id
   * @param {string} id - The id of the element to remove
   * @returns {boolean} Whether element was removed or not
   */
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

/**
 * Get wrapped table by table name
 * @param {string} tableName - The name of the table
 * @returns {HelperFunctionsObject | null} Object with helper functions for working with database table
 */
const getTable = tableName => (DB[tableName] ? wrapTable(DB[tableName]) : null);

export { getTable };
