import 'reflect-metadata';
import { dataDatabasePath } from '../../config'
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

  public cleanup(): void {
    this.connection.close();
  }
}

let provider: DataConnectionProvider;

export async function getDataConnectionProvider(
  autoSchemaSync: boolean = false
): Promise<DataConnectionProvider> {
  if (!provider) {
    let connection = await createConnection({
      name: 'data',
      driver: {
        type: 'sqlite',
        storage: dataDatabasePath,
      },
      entities: [
        DenormalizedDataEntity,
      ],
      autoSchemaSync: autoSchemaSync,
    });

    provider = new DataConnectionProvider(connection);
  }

  return provider;
}
