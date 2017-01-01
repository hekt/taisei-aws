import 'reflect-metadata';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';
import { toPromise } from 'utils/TestUtils';
import Ability from 'domains/Ability/Ability';
import Type from 'domains/Type/Type';
import TypeEfficacy from 'domains/Efficacy/TypeEfficacy';
import TypeEfficacyRepository from 'domains/Efficacy/TypeEfficacyRepository';
import {
  CorrectorInterface,
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from 'domains/Efficacy/Corrector';
import CorrectorFactory from 'domains/Efficacy/CorrectorFactory';

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
          Type.ofFire(),
          Type.ofFire(),
          0.5
        ),
        new TypeEfficacy(
          Type.ofWater(),
          Type.ofFire(),
          2.0
        ),
      ]));

    let ability = new Ability('heatproof', 'HEATPROOF');
    let types = [Type.ofFire(), Type.ofNone()];
    let corrector = await getFactory().create(types, ability);

    expect(corrector.applyRate(Type.ofFire(), 1.0))
      .to.equal(0.25);
  });

});
