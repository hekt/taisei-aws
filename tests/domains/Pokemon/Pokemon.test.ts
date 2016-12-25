import { expect } from 'chai';
import Pokemon from '../../../src/domains/Pokemon/Pokemon';
import Type from '../../../src/domains/Type/Type';

describe('Pokemon', () => {

  it('should be able to instantiate', () => {
    let type1 = Type.ofNormal();
    let type2 = Type.ofNone();
    let pokemon = new Pokemon(1, 'M', null, true, type1, type2);

    expect(pokemon)
      .to.be.an.instanceof(Pokemon);
  });

  it('should have properties', () => {
    let type1 = Type.ofIce();
    let type2 = Type.ofRock();
    let pokemon = new Pokemon(
      10, 'けつばん', 'Alora Form', true , type1, type2
    );

    expect(pokemon)
      .to.have.property('ndex', 10);
    expect(pokemon)
      .to.have.property('name', 'けつばん');
    expect(pokemon)
      .to.have.property('formName', 'Alora Form');
    expect(pokemon)
      .to.have.property('canEvolve', true);
    expect(pokemon)
      .to.have.property('type1', type1);
    expect(pokemon)
      .to.have.property('type2', type2);
  });

  it('should return full name', () => {
    let pokemon = new Pokemon(
      479,
      'ロトム',
      '氷',
      false,
      Type.ofIce(),
      Type.ofNone()
    );

    expect(pokemon.fullName())
      .to.equal('ロトム (氷)');
  });

});
