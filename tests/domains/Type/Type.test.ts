import { expect } from 'chai';
import * as TypeMoq from 'typemoq'
import Type from '../../../src/domains/Type/Type';
import TypeEfficacy from '../../../src/domains/Type/TypeEfficacy';

describe('Type', () => {

  it('should have name', () => {
    let name = 'normal';
    let ptype = new Type(name, 'ノーマル');

    expect(ptype)
      .to.have.property('name', name);
  });

  it('should have logical name', () => {
    let logicalName = 'ノーマル';
    let ptype = new Type('normal', logicalName);

    expect(ptype)
      .to.have.property('logicalName', logicalName);
  });

  it('should have type efficacies', () => {
    let attackerEfficacies: TypeEfficacy[] = [
      TypeMoq.Mock.ofType(TypeEfficacy).object,
    ];
    let attackeeEfficacies: TypeEfficacy[] = [
      TypeMoq.Mock.ofType(TypeEfficacy).object,
    ];
    let ptype = new Type(
      'normal',
      'normal',
      attackerEfficacies,
      attackeeEfficacies
    );

    expect(ptype)
      .to.have.property('efficaciesByAttacker', attackerEfficacies);
    expect(ptype)
      .to.have.property('efficaciesByAttackee', attackeeEfficacies);
  });

  it('should return efficacy rate', () => {
    let fire = new Type('fire', 'ほのお');
    let grass = new Type('grass', 'くさ');
    let fireToGrass = new TypeEfficacy(fire, grass, 2.0);
    let grassToFire = new TypeEfficacy(grass, fire, 0.5);
    fire.efficaciesByAttacker = [fireToGrass];
    fire.efficaciesByAttackee = [grassToFire];
    grass.efficaciesByAttacker = [grassToFire];
    grass.efficaciesByAttackee = [fireToGrass];

    expect(fire.getEfficacyTo(grass))
      .to.equal(2.0);
    expect(fire.getEfficacyBy(grass))
      .to.equal(0.5);
    expect(grass.getEfficacyTo(fire))
      .to.equal(0.5);
    expect(grass.getEfficacyBy(fire))
      .to.equal(2.0);
  });

  it('should raise error by getting unknown types efficacy', () => {
    let normal = new Type('normal', 'ノーマル');
    let unknown = new Type('unknown', 'unknown');

    expect(() => {
      normal.getEfficacyTo(unknown);
    }).to.throw(Error, 'undefined type');
    expect(() => {
      normal.getEfficacyBy(unknown);
    }).to.throw(Error, 'undefined type');
  });

});
