import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import Container from '../../infrastructure/Container';
import ServiceProvider from '../../infrastructure/ServiceProvider';

import AbilityEntity from '../../domains/Ability/AbilityEntity';
import PokemonEntity from '../../domains/Pokemon/PokemonEntity';
import TypeEfficacyEntity from '../../domains/Efficacy/TypeEfficacyEntity';

export class MasterConnectionProvider extends ServiceProvider<Connection> {
  constructor(private connection: Connection) {
    super()
  }

  public getIdentifier(): string {
    return 'connection.master';
  }

  public resolve(contaienr: Container): Connection {
    return this.connection;
  }
}

export async function getMasterConnectionProvider(): Promise<MasterConnectionProvider> {
  let connection = await createConnection({
    name: 'master',
    driver: {
      type: 'sqlite',
      storage: './resources/master.sqlite3',
    },
    entities: [
      PokemonEntity,
      AbilityEntity,
      TypeEfficacyEntity,
    ],
    autoSchemaSync: true,
  });

  return new MasterConnectionProvider(connection);
}
