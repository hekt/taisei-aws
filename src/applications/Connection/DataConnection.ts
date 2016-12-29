import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import Container from '../../infrastructure/Container';
import ServiceProvider from '../../infrastructure/ServiceProvider';

import DenormalizedDataEntity from '../../domains/Denormalized/DenormalizedDataEntity';

export class DataConnectionProvider extends ServiceProvider<Connection> {
  constructor(private connection: Connection) {
    super()
  }

  public getIdentifier(): string {
    return 'connection.data';
  }

  public resolve(contaienr: Container): Connection {
    return this.connection;
  }
}

export async function getDataConnectionProvider(): Promise<DataConnectionProvider> {
  let connection = await createConnection({
    name: 'data',
    driver: {
      type: 'sqlite',
      storage: './resources/data.sqlite3',
    },
    entities: [
      DenormalizedDataEntity,
    ],
    autoSchemaSync: true,
  });

  return new DataConnectionProvider(connection);
}
