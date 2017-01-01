import { expect } from 'chai';
import Type from 'domains/Type/Type';
import TypeEfficacy from 'domains/Efficacy/TypeEfficacy';

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
