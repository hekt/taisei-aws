import 'reflect-metadata'
import {
  Table,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';
import Type from '../Type/Type';
import TypeValue from '../Type/TypeValue';
import Entity from '../../infrastructure/Entity';
import DenormalizedData from './DenormalizedData';

@Table()
class DenormalizedDataEntity implements Entity<DenormalizedData> {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public ndex: number;

  @Column()
  public name: string;

  @Column()
  public formName: string | null;

  @Column()
  public abilityName: string | null;

  @Column()
  public type1: TypeValue;

  @Column()
  public type2: TypeValue;

  @Column()
  public canEvolve: boolean;

  @Column('float')
  public normal: number;

  @Column('float')
  public fight: number;

  @Column('float')
  public flying: number;

  @Column('float')
  public poison: number;

  @Column('float')
  public ground: number;

  @Column('float')
  public rock: number;

  @Column('float')
  public bug: number;

  @Column('float')
  public ghost: number;

  @Column('float')
  public steel: number;

  @Column('float')
  public fire: number;

  @Column('float')
  public water: number;

  @Column('float')
  public grass: number;

  @Column('float')
  public electric: number;

  @Column('float')
  public phychic: number;

  @Column('float')
  public ice: number;

  @Column('float')
  public dragon: number;

  @Column('float')
  public dark: number;

  @Column('float')
  public fairy: number;
  
  public inflate(): DenormalizedData {
    return new DenormalizedData(
      this.ndex,
      this.name,
      this.formName,
      this.abilityName,
      Type.of(this.type1),
      Type.of(this.type2),
      this.canEvolve,
      this.normal,
      this.fight,
      this.flying,
      this.poison,
      this.ground,
      this.rock,
      this.bug,
      this.ghost,
      this.steel,
      this.fire,
      this.water,
      this.grass,
      this.electric,
      this.phychic,
      this.ice,
      this.dragon,
      this.dark,
      this.fairy
    );
  }

  public setValuesFromModel(model: DenormalizedData): DenormalizedDataEntity {
    this.ndex = model.ndex;
    this.name = model.name;
    this.formName = model.formName;
    this.abilityName = model.abilityName;
    this.type1 = model.type1.value;
    this.type2 = model.type2.value;
    this.canEvolve = model.canEvolve;
    this.normal = model.normal;
    this.fight = model.fight;
    this.flying = model.flying;
    this.poison = model.poison;
    this.ground = model.ground;
    this.rock = model.rock;
    this.bug = model.bug;
    this.ghost = model.ghost;
    this.steel = model.steel;
    this.fire = model.fire;
    this.water = model.water;
    this.grass = model.grass;
    this.electric = model.electric;
    this.phychic = model.phychic;
    this.ice = model.ice;
    this.dragon = model.dragon;
    this.dark = model.dark;
    this.fairy = model.fairy;

    return this;
  }
}

export default DenormalizedDataEntity;
