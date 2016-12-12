import {
  Table,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn
} from 'typeorm';
import { Ability } from './Ability';
import { Type } from './Type';

@Table()
export class Pokemon {
  /**
   * Primary key for RDBMS
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * National pokedex number
   */
  @Column('int')
  public ndex: number;

  /**
   * Pokemon name
   */
  @Column()
  public name: string;

  /**
   * Primary type
   */
  @OneToOne(type => Type)
  @JoinColumn()
  public type1: Type

  /**
   * Secondary type
   */
  @OneToOne(type => Type)
  @JoinColumn()
  public type2: Type | null

  /**
   * Special abilities
   */
  @ManyToMany(type => Ability, ability => ability.pokemons, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  @JoinTable()
  public abilities: Ability[] = [];

  /**
   * constructor
   */
  constructor(
    id: number,
    ndex: number,
    name: string,
    type1: Type,
    type2: Type | null,
    abilities: Ability[]
  ) {
    this.id = id;
    this.ndex = ndex;
    this.name = name;
    this.type1 = type1;
    this.type2 = type2;
    this.abilities = abilities;
  }
}
