import { expect } from 'chai';
import Ability from 'domains/Ability/Ability';

describe('Ability', () => {

  it('should be able to instantiate', () => {
    expect(new Ability('thick_fat', 'あついしぼう'))
      .to.be.an.instanceof(Ability);
  });

});
