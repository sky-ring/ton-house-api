import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { ValidatorModule } from './validator/validator.module';
import { BlockModule } from './block/block.module';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.DATABASE_URI, process.env.DATABASE_NAME),
    TransactionModule,
    ValidatorModule,
    BlockModule,
  ],
})
export class AppModule {}
