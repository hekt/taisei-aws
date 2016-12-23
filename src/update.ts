import 'reflect-metadata';
import { createConnection } from 'typeorm';
import PokemonEntity from './domains/Pokemon/Pokemon';
import TypeEfficacyEntity from './domains/Type/TypeEfficacy';

createConnection({
  driver: {
    type: 'sqlite',
    storage: './sqlite-test.sqlite3',
  },
  entities: [
    PokemonEntity,
    TypeEfficacyEntity,
  ],
  autoSchemaSync: true,
}).then(connection => {
  console.log('success!');
}).catch(error => {
  console.log(error);
});
