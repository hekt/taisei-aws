import 'reflect-metadata'
import { Table, Column, PrimaryColumn } from 'typeorm';
import Entity from 'infrastructure/Entity';
import Type from 'domains/Type/Type';
import TypeValue from 'domains/Type/TypeValue';
import TypeEfficacy from 'domains/Efficacy/TypeEfficacy';

@Table('type_efficacy')
class TypeEfficacyEntity extends Entity<TypeEfficacy> {
  @PrimaryColumn('int')
  public attacker: TypeValue;

  @PrimaryColumn('int')
  public attackee: TypeValue;

  @Column('float')
  public rate: number;

  public inflate(): TypeEfficacy {
    return new TypeEfficacy(
      Type.of(this.attacker),
      Type.of(this.attackee),
      this.rate
    );
  }

  public setValuesFromModel(model: TypeEfficacy): TypeEfficacyEntity {
    this.attacker = model.attacker.value;
    this.attackee = model.attackee.value;
    this.rate = model.rate;

    return this;
  }
}

export default TypeEfficacyEntity;
