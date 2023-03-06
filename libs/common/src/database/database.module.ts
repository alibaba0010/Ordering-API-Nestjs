

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGO_URL;
@Module({
  imports: [MongooseModule.forRoot(uri)],
})
export class DatabaseModule {}


