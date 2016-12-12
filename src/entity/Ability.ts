import { Table, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Pokemon } from './Pokemon';

@Table()
export class Ability {
  /**
   * Primary key for RDBMS
   */
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * Ability name
   */
  @Column()
  name: string;

  /**
   * Pokemons that have this ability
   */
  @ManyToMany(type => Pokemon, pokemon => pokemon.abilities, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  pokemons: Pokemon[] = [];
}
