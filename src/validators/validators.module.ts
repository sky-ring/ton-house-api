import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ValidatorsInfoSchema from './validators.model';
import ValidatorsController from './validators.controller';
import ValidatorsProvider from './validators.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ValidatorsInfo', schema: ValidatorsInfoSchema },
    ]),
  ],
  providers: [ValidatorsProvider],
  controllers: [ValidatorsController],
})
export default class ValidatorsModule {}
