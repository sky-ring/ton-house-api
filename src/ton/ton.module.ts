import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TonService } from './ton.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      baseURL: process.env.TON_API_URL,
      timeout: 10000,
    }),
  ],
  providers: [TonService],
  exports: [TonService],
})
export class TonModule {}
