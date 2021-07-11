import {
  FindConditions,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
  Repository,
} from 'typeorm';

export type FindOptions<T> = FindConditions<T> | FindOneOptions<T>;

interface IEntityDAO<T> {
  getAll: (findOptions?: FindManyOptions<T>) => Promise<T[]>;
  find: (findOptions: FindOptions<T>) => Promise<T | null>;
  create: (item: T) => Promise<T | null>;
  update: (
    findOptions: FindOptions<T>,
    newData: DeepPartial<T>
  ) => Promise<T | null>;
  remove: (findOptions: FindOptions<T>) => Promise<boolean>;
}

export class EntityDAO<T> implements IEntityDAO<T> {
  constructor(private readonly repo: Repository<T>) {}

  async getAll(findOptions?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(findOptions);
  }

  async find(findOptions: FindOptions<T>): Promise<T | null> {
    try {
      const item = await this.repo.findOne(findOptions);
      return item ?? null;
    } catch (e) {
      return null;
    }
  }

  async create(item: T): Promise<T | null> {
    try {
      const createdItem = this.repo.create(item);
      return await this.repo.save(createdItem);
    } catch (e) {
      return null;
    }
  }

  async update(
    findOptions: FindOptions<T>,
    newData: DeepPartial<T>
  ): Promise<T | null> {
    try {
      const updateResult = await this.repo.update(findOptions, newData);

      if (updateResult.affected === 0) {
        return null;
      }

      return await this.find(findOptions);
    } catch (e) {
      return null;
    }
  }

  async remove(findOptions: FindOptions<T>): Promise<boolean> {
    try {
      const deleteResult = await this.repo.delete(findOptions);
      return deleteResult.affected !== 0;
    } catch (e) {
      return false;
    }
  }
}
