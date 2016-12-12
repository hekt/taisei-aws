import { Table, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TypeEfficacy } from './TypeEfficacy';

@Table()
export class Type {
  /**
   * Type name
   */
  @PrimaryColumn()
  public name: string;

  /**
   * Japanese logical name
   */
  @Column()
  public logicalName: string;

  /**
   * type efficacies by attacker
   */
  @OneToMany(type => TypeEfficacy, type_efficacy => type_efficacy.attacker)
  public efficaciesByAttacker: TypeEfficacy[] = [];

  /**
   * type efficacies by attackee
   */
  @OneToMany(type => TypeEfficacy, type_efficacy => type_efficacy.attackee)
  public efficaciesByAttackee: TypeEfficacy[] = [];

  /**
   * constructor
   */
  public constructor(
    name: string,
    logicalName: string,
    efficaciesByAttacker: TypeEfficacy[] = [],
    efficaciesByAttackee: TypeEfficacy[] = []
  ) {
    this.name = name;
    this.logicalName = logicalName;
    this.efficaciesByAttacker = efficaciesByAttacker;
    this.efficaciesByAttackee = efficaciesByAttackee;
  }

  /**
   * getEfficacyTo
   */
  public getEfficacyTo(attackee: Type): number {
    let ret: TypeEfficacy | undefined = this.efficaciesByAttacker
      .find((efficacy: TypeEfficacy) => {
        return efficacy.attackee === attackee;
      });

    if (ret === undefined) {
      throw new Error('undefined type');
    }

    return ret.rate;
  }

  /**
   * getEfficacyBy
   */
  public getEfficacyBy(attacker: Type): number {
    let ret: TypeEfficacy | undefined = this.efficaciesByAttackee
      .find((efficacy: TypeEfficacy) => {
        return efficacy.attacker == attacker;
      });

    if (ret === undefined) {
      throw new Error('undefined type');
    }

    return ret.rate;
  }
}
