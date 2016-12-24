// import { expect } from 'chai';
// import Type from '../../../src/domains/Type/Type';
// import TypeValue from '../../../src/domains/Type/TypeValue';
// import TypeEfficacy from '../../../src/domains/Type/TypeEfficacy';
// import TypeEfficacyEntity from '../../../src/domains/Type/TypeEfficacyEntity';

// describe('TypeEfficacyEntity', () => {

//   it('should be able to instantiate', () => {
//     let entity = new TypeEfficacyEntity(
//       TypeValue.FIRE,
//       TypeValue.GRASS,
//       2.0
//     );

//     expect(entity)
//       .to.be.an.instanceof(TypeEfficacyEntity);
//   });

//   it('should have properties', () => {
//     let entity = new TypeEfficacyEntity(
//       TypeValue.WATER,
//       TypeValue.GRASS,
//       0.5
//     );

//     expect(entity)
//       .to.have.property('attacker', TypeValue.WATER);
//     expect(entity)
//       .to.have.property('attackee', TypeValue.GRASS);
//     expect(entity)
//       .to.have.property('rate', 0.5);
//   })

//   it('should inflate to model instance', () => {
//     let entity = new TypeEfficacyEntity(
//       TypeValue.FIGHT,
//       TypeValue.ROCK,
//       2.0
//     );
//     let efficacy = entity.inflate();

//     expect(efficacy)
//       .to.be.an.instanceof(TypeEfficacy);
//     expect(efficacy.attacker.is(Type.of(TypeValue.FIGHT)))
//       .to.be.true;
//     expect(efficacy.attackee.is(Type.of(TypeValue.ROCK)))
//       .to.be.true;
//     expect(efficacy.rate)
//       .to.equal(2.0);
//   });

// });
