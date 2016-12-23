import 'reflect-metadata'
import {
  Table,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn
} from 'typeorm';
import AbilityDAO from './AbilityDAO';

@Table('pokemon')
export default class PokemonDAO {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public ndex: number;

  @Column()
  public name: string;

  @Column()
  public formName: string | null;

  @Column()
  public canEvolve: boolean;

  @Column('int')
  public type1: number;

  @Column('int')
  public type2: number;

  @ManyToMany(type => AbilityDAO, ability => ability.pokemons, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  @JoinTable()
  public abilities: AbilityDAO[];

  public constructor(
    id: number,
    ndex: number,
    name: string,
    formName: string | null,
    canEvolve: boolean,
    type1: number,
    type2: number,
    abilities: AbilityDAO[] = []
  ) {
    this.id = id;
    this.ndex = ndex;
    this.name = name;
    this.formName = formName;
    this.canEvolve = canEvolve;
    this.type1 = type1;
    this.type2 = type2;
    this.abilities = abilities;
  }
}
