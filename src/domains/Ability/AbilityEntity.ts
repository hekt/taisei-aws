import 'reflect-metadata'
import {
  Table,
  Column,
  PrimaryColumn,
  ManyToMany
} from 'typeorm';
import Entity from 'infrastructure/Entity';
import Ability from 'domains/Ability/Ability';

@Table('ability')
class AbilityEntity extends Entity<Ability> {
  @PrimaryColumn()
  public name: string;

  @Column()
  public logicalName: string;

  public inflate(): Ability {
    return new Ability(this.name, this.logicalName);
  }

  public setValuesFromModel(model: Ability): AbilityEntity {
    this.name = model.name;
    this.logicalName = model.logicalName;

    return this;
  }
}

export default AbilityEntity;
