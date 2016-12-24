import { expect } from 'chai';
import Type from '../../../src/domains/Type/Type';
import TypeValue from '../../../src/domains/Type/TypeValue';
import {
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from '../../../src/domains/Efficacy/Corrector';

describe('PassCorrector', () => {

  it('should apply rate', () => {
    let corrector = new PassCorrector();

    expect(corrector.applyRate(Type.of(TypeValue.DARK), 2.0))
      .to.equal(2.0);
    expect(corrector.applyRate(Type.of(TypeValue.ICE), 0.5))
      .to.equal(0.5);
  });

});

describe('SimpleCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new SimpleCorrector(Type.of(TypeValue.NORMAL), 2.0))
      .to.be.an.instanceof(SimpleCorrector);
  });

  it('should apply rate', () => {
    let corrector = new SimpleCorrector(Type.of(TypeValue.FIRE), 2.0);
    let baseRate = 1.5;

    expect(corrector.applyRate(Type.of(TypeValue.FIRE), baseRate))
      .to.equal(baseRate * 2.0);
    expect(corrector.applyRate(Type.of(TypeValue.WATER), baseRate))
      .to.equal(baseRate);
  });
  
});

describe('MultipleCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new MultipleCorrector([]))
      .to.be.an.instanceof(MultipleCorrector);
    expect(new MultipleCorrector([
      new SimpleCorrector(Type.of(TypeValue.ELECTRIC), 0.5),
      new SimpleCorrector(Type.of(TypeValue.GROUND), 2.0),
    ])).to.be.an.instanceof(MultipleCorrector);
  });

  it('should apply rate', () => {
    let corrector = new MultipleCorrector([
      new SimpleCorrector(Type.of(TypeValue.FIRE), 1.25),
      new SimpleCorrector(Type.of(TypeValue.WATER), 0.0),
    ]);

    let baseRate = 2.0;

    expect(corrector.applyRate(Type.of(TypeValue.FIRE), baseRate))
      .to.equal(baseRate * 1.25);
    expect(corrector.applyRate(Type.of(TypeValue.WATER), baseRate))
      .to.equal(baseRate * 0.0);
    expect(corrector.applyRate(Type.of(TypeValue.GRASS), baseRate))
      .to.equal(baseRate);
  });

});

describe('MoreOrEqualCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new MoreOrEqualCorrector(1.5, 2.0))
      .to.be.an.instanceof(MoreOrEqualCorrector);
  });

  it('should apply rate', () => {
    let corrector = new MoreOrEqualCorrector(2.0, 0.75);

    expect(corrector.applyRate(Type.of(TypeValue.NORMAL), 2.0))
      .to.equal(1.5);
    expect(corrector.applyRate(Type.of(TypeValue.FAIRY), 1.0))
      .to.equal(1.0);
  });

});


describe('LessCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new LessCorrector(1.5, 0.75))
      .to.be.an.instanceof(LessCorrector);
  });

  it('should apply rate', () => {
    let corrector = new LessCorrector(2.0, 0.0);

    expect(corrector.applyRate(Type.of(TypeValue.DARK), 1.5))
      .to.equal(0.0);
    expect(corrector.applyRate(Type.of(TypeValue.STEEL), 2.0))
      .to.equal(2.0);
  });

});
