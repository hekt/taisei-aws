import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Pokemon from './domains/Pokemon/Pokemon';
import Ability from './domains/Ability/Ability';
import Type from './domains/Type/Type';
import TypeEfficacy from './domains/Type/TypeEfficacy';

let p: Pokemon = new Pokemon(
  2,
  'pikachu',
  true,
  new Type('normal', 'ノーマル'),
  null,
  []
);
console.log(p);

createConnection({
  driver: {
    type: 'sqlite',
    storage: './sqlite-test.sqlite3',
  },
  entities: [
    Pokemon,
    Ability,
    Type,
    TypeEfficacy,
  ],
  autoSchemaSync: true,
}).then(connection => {
  console.log('success!');
}).catch(error => {
  console.log(error);
});
