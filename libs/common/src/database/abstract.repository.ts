

import { Connection, FilterQuery, Model, SaveOptions, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<ADocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<ADocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<ADocument, '_id'>,
    options?: SaveOptions,
  ): Promise<ADocument> {
    const create = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await create.save(options)).toJSON() as unknown as ADocument;
  }
  async findAll(filterQuery: FilterQuery<ADocument>) {
    return await this.model.find(filterQuery, { __v: 0 }, { lean: true });
  }
  async findOne(filterQuery: FilterQuery<ADocument>) {
    const document = await this.model.findOne(
      filterQuery,
      { __v: 0 },
      { lean: true },
    );
    if (!document) {
      this.logger.warn('Unable to find documet');
      throw new NotFoundException('Documet not Found');
    }
    return document;
  }
  async upsert(
    filterQuery: FilterQuery<ADocument>,
    document: Partial<ADocument>,
  ) {
    return await this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }
  async startTransaction() {
    const session = await this.connection.startSession();
    await session.startTransaction();
    return session;
  }
}
