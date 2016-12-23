import { expect } from 'chai';
import Ability from '../../../src/domains/Ability/Ability';

describe('Ability', () => {

  it('should be able to instantiate', () => {
    expect(new Ability('thick_fat', 'あついしぼう'))
      .to.be.an.instanceof(Ability);
  });

  it('should return corrector', () => {
    let ability = new Ability('wonder_guard', 'ふしぎなまもり');

    expect(ability.corrector())
      .to.be.respondTo('applyRate');
  });

});
