import { UpdateQuery, FilterQuery as MongooseFilterQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

export interface IRepository<T> {
  create: (data: ICreateDocument<T> | T) => Promise<T>;
  findAll: (filter?: FilterQuery<T>) => Promise<T[]>;
  findOne: (filters: FilterQuery<T>) => Promise<T>;
  update: (filter: FilterQuery<T>, data: UpdateQuery<T>) => Promise<any>;
  updateAll: (filter: FilterQuery<T>, data: UpdateQuery<T>) => Promise<any>;
  delete: (filter: FilterQuery<T>) => Promise<any>;
}

export class FilterQuery<T> {
  query: MongooseFilterQuery<T>;
  populate?:
    | {
        path: string;
        select?: string | { [key: string]: any };
        options?: any;
      }
    | Array<{
        path: string;
        select?: string | { [key: string]: any };
        options?: any;
      }>;
  skip?: number;
  limit?: number;
}

export interface ICreateDocument<T> {
  value: T;
}

@Injectable()
export abstract class Repository<T> implements IRepository<T> {
  protected readonly logger: Logger;

  constructor(private readonly model: Model<T>) {
    this.logger = new Logger(model.name);
  }

  async create(data: ICreateDocument<T>): Promise<T> {
    return await this.model.create(data.value || data);
  }

  async findAll(filter?: FilterQuery<T>): Promise<T[]> {
    const query = this.model.find(filter?.query);

    if (Boolean(filter.populate)) {
      if (Array.isArray(filter.populate))
        for (const field of filter.populate)
          query.populate(field.path, field.select, field.options);
      else
        query.populate(
          filter.populate.path,
          filter.populate.select,
          filter.populate.options,
        );
    }

    if (Boolean(filter?.limit)) query.limit(filter?.limit);
    if (Boolean(filter?.skip)) query.skip(filter.skip);

    return await query.exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    const query = this.model.findOne(filter.query);

    if (Boolean(filter.populate)) query.populate(filter.populate);

    return await query.exec();
  }

  async update(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model
      .findOneAndUpdate(filter.query, data, { new: true })
      .exec();
  }

  async updateAll(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<any> {
    return this.model.updateMany(filter.query, data);
  }

  async delete(filter: FilterQuery<T>): Promise<any> {
    return await this.model.deleteOne(filter.query);
  }

  async count(filter?: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(filter.query);
  }
}
