import {
  Table,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import Entity from '../../infrastructure/Entity';
import AbilityEntity from '../Ability/AbilityEntity';
import Type from '../Type/Type';
import TypeValue from '../Type/TypeValue';
import Pokemon from './Pokemon';

@Table('pokemon')
class PokemonEntity extends Entity<Pokemon> {
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
  public type1: TypeValue;

  @Column('int')
  public type2: TypeValue;

  @ManyToMany(type => AbilityEntity, {
    cascadeInsert: true,
    cascadeUpdate: true,
    cascadeRemove: true
  })
  @JoinTable()
  public abilities: AbilityEntity[];

  public inflate(): Pokemon {
    return new Pokemon(
      this.ndex,
      this.name,
      this.formName,
      this.canEvolve,
      Type.of(this.type1),
      Type.of(this.type2),
      this.abilities.map((ability) => {
        return ability.inflate();
      })
    );
  }

  public setValuesFromModel(model: Pokemon): PokemonEntity {
    this.ndex = model.ndex;
    this.name = model.name;
    this.formName = model.formName;
    this.canEvolve = model.canEvolve;
    this.type1 = model.type1.value;
    this.type2 = model.type2.value;
    this.abilities = model.abilities.map((ability) => {
      return (new AbilityEntity).setValuesFromModel(ability);
    });

    return this;
  }
}

export default PokemonEntity;
