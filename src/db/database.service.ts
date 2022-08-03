import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'cassandra-driver';
import type { ArrayOrObject, QueryOptions } from 'cassandra-driver';

@Injectable()
export default class DatabaseProvider
  implements OnModuleInit, OnApplicationShutdown
{
  private client: Client;
  public KEYSPACE = process.env['DB_KEYSPACE'];

  execute(query: string, params?: ArrayOrObject, options?: QueryOptions) {
    return this.client.execute(query, params, options);
  }

  onModuleInit() {
    this.client = new Client({
      keyspace: this.KEYSPACE,
      contactPoints: [process.env['DB_ADDR'] ?? '127.0.0.1:9042'],
      localDataCenter: process.env['DB_LDC'] ?? '',
    });
  }
  onApplicationShutdown() {
    this.client.shutdown();
  }
}
