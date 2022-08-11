import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ValidatorSchema from './models/validator.model';
import ValidatorsInfoSchema from './models/validatorInfo.model';
import ValidatorsController from './validators.controller';
import ValidatorsProvider from './validators.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ValidatorsInfo', schema: ValidatorsInfoSchema },
      { name: 'Validator', schema: ValidatorSchema },
    ]),
  ],
  providers: [ValidatorsProvider],
  controllers: [ValidatorsController],
})
export default class ValidatorsModule {}
