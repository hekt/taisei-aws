import 'reflect-metadata'
import {
  Table,
  Column,
  PrimaryColumn,
  ManyToMany
} from 'typeorm';
import PokemonDAO from './PokemonDAO';

@Table('ability')
export default class AbilityDAO {
  @PrimaryColumn()
  public name: string;

  @Column()
  public logicalName: string;

  @ManyToMany(type => PokemonDAO, pokemon => pokemon.abilities, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  public pokemons: PokemonDAO[];

  public constructor(
    name: string,
    logicalName: string,
    pokemons: PokemonDAO[] = []
  ) {
    this.name = name;
    this.logicalName = logicalName;
    this.pokemons = pokemons;
  }
}
