import { expect } from 'chai';
import Type from 'domains/Type/Type';
import {
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from 'domains/Efficacy/Corrector';

describe('PassCorrector', () => {

  it('should apply rate', () => {
    let corrector = new PassCorrector();

    expect(corrector.applyRate(Type.ofDark(), 2.0))
      .to.equal(2.0);
    expect(corrector.applyRate(Type.ofIce(), 0.5))
      .to.equal(0.5);
  });

});

describe('SimpleCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new SimpleCorrector(Type.ofNormal(), 2.0))
      .to.be.an.instanceof(SimpleCorrector);
  });

  it('should apply rate', () => {
    let corrector = new SimpleCorrector(Type.ofFire(), 2.0);
    let baseRate = 1.5;

    expect(corrector.applyRate(Type.ofFire(), baseRate))
      .to.equal(baseRate * 2.0);
    expect(corrector.applyRate(Type.ofWater(), baseRate))
      .to.equal(baseRate);
  });
  
});

describe('MultipleCorrector', () => {

  it('should be able to instantiate', () => {
    expect(new MultipleCorrector([]))
      .to.be.an.instanceof(MultipleCorrector);
    expect(new MultipleCorrector([
      new SimpleCorrector(Type.ofElectric(), 0.5),
      new SimpleCorrector(Type.ofGround(), 2.0),
    ])).to.be.an.instanceof(MultipleCorrector);
  });

  it('should apply rate', () => {
    let corrector = new MultipleCorrector([
      new SimpleCorrector(Type.ofFire(), 1.25),
      new SimpleCorrector(Type.ofWater(), 0.0),
    ]);

    let baseRate = 2.0;

    expect(corrector.applyRate(Type.ofFire(), baseRate))
      .to.equal(baseRate * 1.25);
    expect(corrector.applyRate(Type.ofWater(), baseRate))
      .to.equal(baseRate * 0.0);
    expect(corrector.applyRate(Type.ofGrass(), baseRate))
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

    expect(corrector.applyRate(Type.ofNormal(), 2.0))
      .to.equal(1.5);
    expect(corrector.applyRate(Type.ofFairy(), 1.0))
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

    expect(corrector.applyRate(Type.ofDark(), 1.5))
      .to.equal(0.0);
    expect(corrector.applyRate(Type.ofSteel(), 2.0))
      .to.equal(2.0);
  });

});
