import { Module } from '@nestjs/common';
import KafkaModule from 'src/kafka/kafka.module';
import TransactionsGateway from './transactions.gateway';

@Module({
  imports: [KafkaModule],
  providers: [TransactionsGateway],
})
export default class SocketModule {}
