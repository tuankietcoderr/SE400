import { NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'mongodb';
import {
  AggregateOptions,
  Document,
  FilterQuery,
  Model,
  MongooseBaseQueryOptions,
  MongooseUpdateQueryOptions,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline
} from 'mongoose';
import { RemovedModel } from '../types';

export class Repository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: object, saveOptions?: SaveOptions) {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save(saveOptions);

    return savedResult;
  }

  findOne(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
    return this.model.findOne(filter, projection, options);
  }

  async findOneOrThrow(filter: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
    const entity = await this.model.findOne(filter, projection, options);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  async findById(id: string, projection?: ProjectionType<T>, options?: QueryOptions): Promise<T | null> {
    return await this.model.findById(id, projection, options);
  }

  async findByIdOrThrow(id: string, projection?: ProjectionType<T>, options?: QueryOptions) {
    const entity = await this.model.findById(id, projection, options);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  async findByIdAndUpdate(id: string, update: UpdateQuery<T>, options?: QueryOptions) {
    const entity = await this.model.findByIdAndUpdate(id, update, options);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  async findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions) {
    const entity = await this.model.findOneAndUpdate(filter, update, options);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  async findByIdAndDelete(id: string) {
    const entity = await this.model.findByIdAndDelete(id);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  async findOneAndDelete(filter: FilterQuery<T>) {
    const entity = await this.model.findOneAndDelete(filter);

    if (!entity) {
      throw new NotFoundException(`Entity ${this.model.name} not found`);
    }

    return entity;
  }

  findAll(filter?: FilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
    return this.model.find(filter, projection, options);
  }

  deleteMany(filter: FilterQuery<T>): Promise<RemovedModel> {
    return this.model.deleteMany(filter);
  }

  updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions<T>
  ): Promise<UpdateResult> {
    return this.model.updateOne(filter, updated, options);
  }

  updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions
  ): Promise<UpdateResult> {
    return this.model.updateMany(filter, updated, options);
  }

  insertMany(docs: object[], options?: SaveOptions) {
    return this.model.insertMany(docs, options);
  }

  aggregate(pipeline: PipelineStage[], options?: AggregateOptions) {
    return this.model.aggregate(pipeline, options);
  }

  countDocuments(filter: FilterQuery<T>, countOptions?: MongooseBaseQueryOptions): Promise<number> {
    return this.model.countDocuments(filter, countOptions);
  }

  get Ins(): Model<T> {
    return this.model;
  }

  newEntity(doc: object) {
    return new this.model(doc);
  }
}
