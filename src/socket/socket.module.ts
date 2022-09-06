import { Module } from '@nestjs/common';
import { BlocksModel } from 'src/blocks/blocks.module';
import KafkaModule from 'src/kafka/kafka.module';
import BlocksGateway from './blocks.gateway';
import TransactionsGateway from './transactions.gateway';
import ValidatorsGateway from './validators.gateway';

@Module({
  imports: [KafkaModule, BlocksModel],
  providers: [TransactionsGateway, ValidatorsGateway, BlocksGateway],
})
export default class SocketModule {}
