import 'reflect-metadata';
import { masterDatabasePath } from '../../config'
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

  public cleanup(): void {
    this.connection.close();
  }
}

let provider: MasterConnectionProvider;

export async function getMasterConnectionProvider(
  autoSchemaSync: boolean = false
): Promise<MasterConnectionProvider> {
  if (!provider) {
    let connection = await createConnection({
      name: 'master',
      driver: {
        type: 'sqlite',
        storage: masterDatabasePath,
      },
      entities: [
        PokemonEntity,
        AbilityEntity,
        TypeEfficacyEntity,
      ],
      autoSchemaSync: autoSchemaSync,
    });

    provider = new MasterConnectionProvider(connection);
  }

  return provider;
}
