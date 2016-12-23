import { expect } from 'chai';
import Type from '../../../src/domains/Type/Type';
import TypeValue from '../../../src/domains/Type/TypeValue';
import TypeEfficacy from '../../../src/domains/Type/TypeEfficacy';

describe('TypeEfficacy', () => {

  it('should be able to instantiate', () => {
    let efficacy = new TypeEfficacy(
      Type.of(TypeValue.NORMAL),
      Type.of(TypeValue.STEEL),
      0.5
    );

    expect(efficacy)
      .to.be.an.instanceof(TypeEfficacy);
  });

  it('should return corrector', () => {
    let efficacy = new TypeEfficacy(
      Type.of(TypeValue.ROCK),
      Type.of(TypeValue.FLYING),
      2.0
    );
    let corrector = efficacy.asCorrector();

    expect(corrector)
      .to.be.respondTo('applyRate');
  });

});
