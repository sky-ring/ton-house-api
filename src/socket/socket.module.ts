import { Module } from '@nestjs/common';
import KafkaModule from 'src/kafka/kafka.module';
import TransactionsGateway from './transactions.gateway';
import ValidatorsGateway from './validators.gateway';

@Module({
  imports: [KafkaModule],
  providers: [TransactionsGateway, ValidatorsGateway],
})
export default class SocketModule {}
