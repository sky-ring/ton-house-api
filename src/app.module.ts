import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import TransactionsModule from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TransactionsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
