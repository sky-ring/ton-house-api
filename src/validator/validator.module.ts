import { Module } from '@nestjs/common';
import { ValidatorController } from './validator.controller';
import { ValidatorService } from './validator.service';
import { ValidatorRepistory } from './validator.repository';
import { MongoModule } from 'nest-mongodb';
import { Validator, ValidatorsInfo } from './entity';
import { TonModule } from '../ton/ton.module';

@Module({
  imports: [
    MongoModule.forFeature([ValidatorsInfo.name, Validator.name]),
    TonModule,
  ],
  providers: [ValidatorService, ValidatorRepistory],
  controllers: [ValidatorController],
})
export class ValidatorModule {}
