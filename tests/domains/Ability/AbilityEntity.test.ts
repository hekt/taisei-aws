// import { expect } from 'chai';
// import Ability from '../../../src/domains/Ability/Ability';
// import AbilityEntity from '../../../src/domains/Ability/AbilityEntity';

// describe('AbilityEntity', () => {

//   it('should be able to instantiate', () => {
//     let entity = new AbilityEntity(
//       'prism_armor',
//       'プリズムアーマー',
//       []
//     );

//     expect(entity)
//       .to.be.an.instanceof(AbilityEntity);
//   });

//   it('should inflate to model instance', () => {
//     let entity = new AbilityEntity(
//       'solid_rock',
//       'ハードロック',
//       []
//     );
//     let ability = entity.inflate();

//     expect(ability)
//       .to.be.an.instanceof(Ability);
//     expect(ability)
//       .to.have.property('name', 'solid_rock');
//     expect(ability)
//       .to.have.property('logicalName', 'ハードロック');
//   });

// });
