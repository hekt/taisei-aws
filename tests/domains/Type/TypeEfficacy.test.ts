import { expect } from 'chai';
import Type from '../../../src/domains/Type/Type';
import TypeEfficacy from '../../../src/domains/Type/TypeEfficacy';

describe('TypeEfficacy', () => {

  it('should be able to instantiate', () => {
    let efficacy = new TypeEfficacy(
      Type.ofNormal(),
      Type.ofSteel(),
      0.5
    );

    expect(efficacy)
      .to.be.an.instanceof(TypeEfficacy);
  });

});
