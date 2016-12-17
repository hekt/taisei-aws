import 'reflect-metadata'
import { Table, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Pokemon from '../Pokemon/Pokemon';

@Table()
export default class Ability {
  /**
   * Primary key for RDBMS
   */
  @PrimaryGeneratedColumn()
  public id: string;

  /**
   * Ability name
   */
  @Column()
  public name: string;

  /**
   * Pokemons that have this ability
   */
  @ManyToMany(type => Pokemon, pokemon => pokemon.abilities, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  public pokemons: Pokemon[] = [];
}
