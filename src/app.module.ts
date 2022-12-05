import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { ValidatorModule } from './validator/validator.module';
import { BlockModule } from './block/block.module';
import { MongoModule } from 'nest-mongodb';
import { ScheduleModule } from '@nestjs/schedule';
import { TonModule } from './ton/ton.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.DATABASE_URI, process.env.DATABASE_NAME),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    TransactionModule,
    ValidatorModule,
    BlockModule,
    TonModule,
  ],
})
export class AppModule {}
