// import 'reflect-metadata'
// import {
//   Table,
//   Column,
// } from 'typeorm';
// import EntityInterface from '../../utils/EntityInterface';
// import Denormalized from './Denormalized';

// @Table()
// class DenormalizedEntity implements EntityInterface<Denormalized> {
//   @Column('int')
//   public ndex: number;

//   @Column()
//   public name: string;

//   @Column()
//   public formName: string | null;

//   @Column()
//   public logicalAbilityName: string | null;

//   @Column()
//   public canEvolve: boolean;

//   @Column('float')
//   public normal: number;

//   @Column('float')
//   public fight: number;

//   @Column('float')
//   public flying: number;

//   @Column('float')
//   public poison: number;

//   @Column('float')
//   public ground: number;

//   @Column('float')
//   public rock: number;

//   @Column('float')
//   public bug: number;

//   @Column('float')
//   public ghost: number;

//   @Column('float')
//   public steel: number;

//   @Column('float')
//   public fire: number;

//   @Column('float')
//   public water: number;

//   @Column('float')
//   public grass: number;

//   @Column('float')
//   public electric: number;

//   @Column('float')
//   public phychic: number;

//   @Column('float')
//   public ice: number;

//   @Column('float')
//   public dragon: number;

//   @Column('float')
//   public dark: number;

//   @Column('float')
//   public fairy: number;

//   public constructor(
//     ndex: number,
//     name: string,
//     formName: string | null,
//     logicalAbilityName: string | null,
//     canEvolve: boolean,
//     normal: number,
//     fight: number,
//     flying: number,
//     poison: number,
//     ground: number,
//     rock: number,
//     bug: number,
//     ghost: number,
//     steel: number,
//     fire: number,
//     water: number,
//     grass: number,
//     electric: number,
//     phychic: number,
//     ice: number,
//     dragon: number,
//     dark: number,
//     fairy: number
//   ) {
//     this.ndex = ndex;
//     this.name = name;
//     this.formName = formName;
//     this.logicalAbilityName = logicalAbilityName;
//     this.canEvolve = canEvolve;
//     this.normal = normal;
//     this.fight = fight;
//     this.flying = flying;
//     this.poison = poison;
//     this.ground = ground;
//     this.rock = rock;
//     this.bug = bug;
//     this.ghost = ghost;
//     this.steel = steel;
//     this.fire = fire;
//     this.water = water;
//     this.grass = grass;
//     this.electric = electric;
//     this.phychic = phychic;
//     this.ice = ice;
//     this.dragon = dragon;
//     this.dark = dark;
//     this.fairy = fairy;
//   }
  
//   public inflate(): Denormalized {
//     return new Denormalized(
//       this.ndex,
//       this.name,
//       this.formName,
//       this.logicalAbilityName,
//       this.canEvolve,
//       this.normal,
//       this.fight,
//       this.flying,
//       this.poison,
//       this.ground,
//       this.rock,
//       this.bug,
//       this.ghost,
//       this.steel,
//       this.fire,
//       this.water,
//       this.grass,
//       this.electric,
//       this.phychic,
//       this.ice,
//       this.dragon,
//       this.dark,
//       this.fairy
//     );
//   }
// }

// export default DenormalizedEntity;
