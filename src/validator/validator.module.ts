import { Module } from '@nestjs/common';
import { ValidatorController } from './validator.controller';
import { ValidatorService } from './validator.service';
import { ValidatorRepistory } from './validator.repository';
import { MongoModule } from 'nest-mongodb';
import { ValidatorsInfo } from './entity';

@Module({
  imports: [MongoModule.forFeature([ValidatorsInfo.name])],
  providers: [ValidatorService, ValidatorRepistory],
  controllers: [ValidatorController],
})
export class ValidatorModule {}
