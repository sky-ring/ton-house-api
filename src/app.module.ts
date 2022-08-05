import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import TransactionsModule from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import SocketModule from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env['DB_CONNECTION'], {
      directConnection: true,
      authSource: 'admin',
    }),
    TransactionsModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
