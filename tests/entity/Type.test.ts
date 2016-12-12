import { assert } from 'chai';
import { Type } from '../../src/entity/Type';
import { TypeEfficacy } from '../../src/entity/TypeEfficacy';

describe('Type', () => {

  it('should return efficacy rate', () => {
    let fire = new Type('fire', 'ほのお');
    let grass = new Type('grass', 'くさ');
    let fireToGrass = new TypeEfficacy(fire, grass, 2.0);
    let grassToFire = new TypeEfficacy(grass, fire, 0.5);
    fire.efficaciesByAttacker = [fireToGrass];
    fire.efficaciesByAttackee = [grassToFire];
    grass.efficaciesByAttacker = [grassToFire];
    grass.efficaciesByAttackee = [fireToGrass];

    assert.strictEqual(2.0, fire.getEfficacyTo(grass));
    assert.strictEqual(0.5, fire.getEfficacyBy(grass));
    assert.strictEqual(0.5, grass.getEfficacyTo(fire));
    assert.strictEqual(2.0, grass.getEfficacyBy(fire));
  });

  it('should raise error by getting unknown types efficacy', () => {
    let normal = new Type('normal', 'ノーマル');
    let unknown = new Type('unknown', 'unknown');

    assert.throws(() => {
      normal.getEfficacyTo(unknown);
    }, Error, 'undefined type');
    assert.throws(() => {
      normal.getEfficacyBy(unknown);
    }, Error, 'undefined type');
  });

});
