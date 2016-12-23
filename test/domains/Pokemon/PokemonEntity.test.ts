import { expect } from 'chai';
import PokemonEntity from '../../../src/domains/Pokemon/PokemonEntity';
import Type from '../../../src/domains/Type/Type';
import TypeValue from '../../../src/domains/Type/TypeValue';
import Pokemon from '../../../src/domains/Pokemon/Pokemon';

describe('PokemonEntity', () => {

  it('should be able to instantiate', () => {
    let entity = new PokemonEntity(
      1, 2, 'M', 'Alora Form', true, TypeValue.NORMAL, TypeValue.FLYING
    );

    expect(entity)
      .to.be.an.instanceof(PokemonEntity);
  });

  it('should inflate to model instance', () => {
    let entity = new PokemonEntity(
      1, 11, 'M', 'Alora Form', false, TypeValue.FIRE, TypeValue.STEEL
    );
    let pokemon = entity.inflate();

    expect(pokemon)
      .to.be.an.instanceof(Pokemon);
    expect(pokemon)
      .to.have.property('ndex', 11);
    expect(pokemon)
      .to.have.property('name', 'M');
    expect(pokemon)
      .to.have.property('formName', 'Alora Form');
    expect(pokemon)
      .to.have.property('canEvolve', false);
    expect(pokemon.type1.is(Type.of(TypeValue.FIRE)))
      .to.be.true;
    expect(pokemon.type2)
      .to.not.be.null;
    expect(pokemon.type2!.is(Type.of(TypeValue.STEEL)))
      .to.be.true;
  });

});
