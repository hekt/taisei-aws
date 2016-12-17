import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import Pokemon from '../../../src/domains/Pokemon/Pokemon';
import Type from '../../../src/domains/Type/Type';
import Ability from '../../../src/domains/Ability/Ability';

describe('Pokemon', () => {

  it('should have ndex', () => {
    let ndex = 100;
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let pokemon = new Pokemon(ndex, 'M', true, type1);

    expect(pokemon)
      .to.have.property('ndex', ndex);
  });

  it('should have name', () => {
    let name = 'けつばん';
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let pokemon = new Pokemon(1, name, true, type1);

    expect(pokemon)
      .to.have.property('name', name);
  });

  it('should have evolvability', () => {
    let canEvolve = true;
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let pokemon= new Pokemon(1, 'M', canEvolve, type1);

    expect(pokemon)
      .to.have.property('canEvolve', canEvolve);
  })

  it('should have primary type', () => {
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let pokemon = new Pokemon(1, 'M', true, type1);

    expect(pokemon)
      .to.have.property('type1', type1);
  });

  it('might have secondary type', () => {
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let type2 = TypeMoq.Mock.ofType(Type).object;

    let pokemon1 = new Pokemon(1, 'M', true, type1, type2);
    let pokemon2 = new Pokemon(1, 'M', true, type1);

    expect(pokemon1)
      .to.have.property('type2', type2);
    expect(pokemon2)
      .to.have.property('type2', null);
  });

  it('shoule have abilities', () => {
    let type1 = TypeMoq.Mock.ofType(Type).object;
    let abilities: Ability[] = [TypeMoq.Mock.ofType(Ability).object];
    let pokemon = new Pokemon(1, 'M', true, type1, null, abilities);

    expect(pokemon)
      .to.have.property('abilities', abilities);
  })

  it('should return efficacy rate', () => {
    let attacker = TypeMoq.Mock.ofType(Type);
    let type1  = TypeMoq.Mock.ofType(Type);
    type1
      .setup(x => x.getEfficacyBy(attacker.object))
      .returns(() => 2.0)
    let type2 = TypeMoq.Mock.ofType(Type);
    type2
      .setup(x => x.getEfficacyBy(attacker.object))
      .returns(() => 1.5)
    let pokemon = new Pokemon(1, 'M', true, type1.object, type2.object);

    expect(pokemon.getTypeEfficacyBy(attacker.object))
      .to.equal(3.0);
  });

});
