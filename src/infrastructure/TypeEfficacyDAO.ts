import 'reflect-metadata'
import { Table, Column, PrimaryColumn } from 'typeorm';

@Table('type_efficacy')
class TypeEfficacyDAO {
  @PrimaryColumn('int')
  public attacker: number;

  @PrimaryColumn('int')
  public attackee: number;

  @Column('float')
  public rate: number;

  constructor(
    attacker: number,
    attackee: number,
    rate: number
  ) {
    this.attacker = attacker;
    this.attackee = attackee;
    this.rate = rate;
  }
}

export default TypeEfficacyDAO;
