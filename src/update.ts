import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Pokemon } from './entity/Pokemon';
import { Ability } from './entity/Ability';
import { Type } from './entity/Type';
import { TypeEfficacy } from './entity/TypeEfficacy';

let p: Pokemon = new Pokemon(
  1,
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
