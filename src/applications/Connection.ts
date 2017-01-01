import { ConnectionOptions } from 'typeorm';

// master
import AbilityEntity from '../domains/Ability/AbilityEntity';
import PokemonEntity from '../domains/Pokemon/PokemonEntity';
import TypeEfficacyEntity from '../domains/Efficacy/TypeEfficacyEntity';

// data
import DenormalizedDataEntity from '../domains/Denormalized/DenormalizedDataEntity';

export function getMasterConnectionOptions(
  autoSchemaSync: boolean = false
): ConnectionOptions {
  return {
    name: 'connection.master',
    driver: {
      type: 'sqlite',
      storage: './resources/master.sqlite3',
    },
    entities: [
      PokemonEntity,
      AbilityEntity,
      TypeEfficacyEntity,
    ],
    autoSchemaSync: autoSchemaSync,
  }
}

export function getDataConnectionOptions(
  autoSchemaSync: boolean = false
): ConnectionOptions {
  return {
    name: 'connection.data',
    driver: {
      type: 'sqlite',
      storage: './resources/data.sqlite3',
    },
    entities: [
      DenormalizedDataEntity,
    ],
    autoSchemaSync: autoSchemaSync,
  }
}
