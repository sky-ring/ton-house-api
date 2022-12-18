import { Controller, Get } from '@nestjs/common';
import { NetworkStatusService } from './networkStatus.service';

@Controller(NetworkStatusController.path)
export class NetworkStatusController {
  static path = 'status';

  constructor(private readonly networkStatusService: NetworkStatusService) {}

  @Get()
  findAll() {
    return this.networkStatusService.getCurrentStatus();
  }
}
