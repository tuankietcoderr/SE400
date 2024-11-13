import { Document, HydratedDocument, ProjectionType, QueryOptions } from 'mongoose';

export interface IRepository<T> {
  findById(id: string, projection?: ProjectionType<T>, options?: QueryOptions): Promise<HydratedDocument<T>>;

  findByIdOrThrow(id: string, projection?: ProjectionType<T>, options?: QueryOptions): Promise<HydratedDocument<T>>;

  findOne(query: Partial<T>, projection?: ProjectionType<T>, options?: QueryOptions): Promise<HydratedDocument<T>>;
  findOneOrThrow(
    query: Partial<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions
  ): Promise<HydratedDocument<T>>;
  create(data: Partial<T>): Promise<HydratedDocument<T>>;
  delete(query: Partial<T>): Promise<HydratedDocument<T>>;

  findAll(projection?: ProjectionType<T>, options?: QueryOptions): Promise<HydratedDocument<T>[]>;
}
