import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { Transaction } from './entity';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
  imports: [MongoModule.forFeature([Transaction.name])],
  providers: [TransactionService, TransactionRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
