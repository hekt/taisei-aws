import 'reflect-metadata';
import { createConnection } from 'typeorm';
import PokemonEntity from './domains/Pokemon/PokemonEntity';
import AbilityEntity from './domains/Ability/AbilityEntity';
import TypeEfficacyEntity from './domains/Type/TypeEfficacyEntity';

createConnection({
  driver: {
    type: 'sqlite',
    storage: './sqlite-test.sqlite3',
  },
  entities: [
    PokemonEntity,
    AbilityEntity,
    TypeEfficacyEntity,
  ],
  autoSchemaSync: true,
}).then(connection => {
  console.log('success!');
}).catch(error => {
  console.log(error);
});
