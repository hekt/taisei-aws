import 'reflect-metadata';
import { Table, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Type } from './Type';

@Table()
export class TypeEfficacy {
  /**
   * Primary key for RDBMS
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Efficacy rate
   */
  @Column('double')
  public rate: number;

  /**
   * Attacker type
   */
  @ManyToOne(type => Type, attacker => attacker.efficaciesByAttacker)
  public attacker: Type;

  /**
   * Attackee type
   */
  @ManyToOne(type => Type, attackee => attackee.efficaciesByAttackee)
  public attackee: Type;

  /**
   * constructor
   */
  public constructor(
    attacker: Type,
    attackee: Type,
    rate: number
  ) {
    this.attacker = attacker;
    this.attackee = attackee;
    this.rate = rate;
  }
}
