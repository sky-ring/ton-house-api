import { Module } from '@nestjs/common';
import { BlockModule } from '../block/block.module';
import { NetworkStatusController } from './networkStatus.controller';
import { NetworkStatusGateway } from './networkStatus.gateway';
import { NetworkStatusService } from './networkStatus.service';

@Module({
  imports: [BlockModule],
  providers: [NetworkStatusService, NetworkStatusGateway],
  controllers: [NetworkStatusController],
})
export class NetworkStatusModule {}
