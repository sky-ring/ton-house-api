import { Global, Module } from '@nestjs/common';
import DatabaseProvider from './database.service';

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export default class DatabaseModule {}
