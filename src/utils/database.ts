import {
  getConnection,
  EntityTarget,
  FindConditions,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';

type FindOptions<T> = FindConditions<T> | FindOneOptions<T>;

interface IEntityDAO<T> {
  getAll: (findOptions?: FindManyOptions<T>) => Promise<T[]>;
  getById: (findOptions: FindOptions<T>) => Promise<T | null>;
  create: (item: T) => Promise<T | null>;
  update: (
    findOptions: FindOptions<T>,
    newData: DeepPartial<T>
  ) => Promise<T | null>;
  remove: (findOptions: FindOptions<T>) => Promise<boolean>;
}

const wrapEntity = <T>(entity: EntityTarget<T>): IEntityDAO<T> => {
  const getAll = async (findOptions?: FindManyOptions<T>): Promise<T[]> =>
    getConnection().getRepository(entity).find(findOptions);

  const getById = async (findOptions: FindOptions<T>): Promise<T | null> => {
    try {
      const item = await getConnection()
        .getRepository(entity)
        .findOne(findOptions);
      return item ?? null;
    } catch (e) {
      return null;
    }
  };

  const create = async (item: T): Promise<T | null> => {
    try {
      const createdItem = getConnection().getRepository(entity).create(item);
      return await getConnection().getRepository(entity).save(createdItem);
    } catch (e) {
      return null;
    }
  };

  const update = async (
    findOptions: FindOptions<T>,
    newData: DeepPartial<T>
  ): Promise<T | null> => {
    try {
      const updateResult = await getConnection()
        .getRepository(entity)
        .update(findOptions, newData);

      if (updateResult.affected === 0) {
        return null;
      }

      return await getById(findOptions);
    } catch (e) {
      return null;
    }
  };

  const remove = async (findOptions: FindOptions<T>): Promise<boolean> => {
    try {
      const deleteResult = await getConnection()
        .getRepository(entity)
        .delete(findOptions);
      return deleteResult.affected !== 0;
    } catch (e) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

export const getEntityDAO = <T>(entity: EntityTarget<T>): IEntityDAO<T> =>
  wrapEntity<T>(entity);
