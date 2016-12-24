import 'reflect-metadata';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { toPromise } from '../TestUtils';
import Ability from '../../src/domains/Ability/Ability';
import Pokemon from '../../src/domains/Pokemon/Pokemon';
import Type from '../../src/domains/Type/Type';
import TypeValue from '../../src/domains/Type/TypeValue';
import TypeEfficacy from '../../src/domains/Type/TypeEfficacy';
import TypeEfficacyRepository from '../../src/domains/Type/TypeEfficacyRepository';
import {
  CorrectorInterface,
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from '../../src/domains/Efficacy/Corrector';
import CorrectorFactory from '../../src/applications/CorrectorFactory';

describe('CorrectorFactory', () => {
  let mTypeEfficacyRepository: TypeMoq.IMock<TypeEfficacyRepository>;

  let prepareMocks = () => {
    mTypeEfficacyRepository = TypeMoq.Mock.ofType(TypeEfficacyRepository);
  }
  let getFactory = () => {
    return new CorrectorFactory(
      mTypeEfficacyRepository.object
    );
  }

  it('should be instantiate', () => {
    prepareMocks();

    expect(() => {
      new CorrectorFactory(
        mTypeEfficacyRepository.object
      );
    }).to.not.throw(Error);
  });

  it('should create corrector', async () => {
    prepareMocks();
    mTypeEfficacyRepository
      .setup(x => x.collectByAttackeeTypes(TypeMoq.It.isAny()))
      .returns(() => toPromise([
        new TypeEfficacy(
          Type.of(TypeValue.FIRE),
          Type.of(TypeValue.FIRE),
          0.5
        ),
        new TypeEfficacy(
          Type.of(TypeValue.WATER),
          Type.of(TypeValue.FIRE),
          2.0
        ),
      ]));

    let ability = new Ability('heatproof', 'HEATPROOF');
    let pokemon = new Pokemon(
      1,
      'Hitokage',
      null,
      true,
      Type.of(TypeValue.FIRE),
      Type.of(TypeValue.NONE),
      [ability]
    );
    let corrector = await getFactory().createByPokemon(pokemon, ability);

    expect(corrector.applyRate(Type.of(TypeValue.FIRE), 1.0))
      .to.equal(0.25);
  });

});
