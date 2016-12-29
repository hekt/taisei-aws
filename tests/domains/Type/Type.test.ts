import { expect } from 'chai';
import Type from '../../../src/domains/Type/Type';
import TypeValue from '../../../src/domains/Type/TypeValue';

describe('Type', () => {

  it('should be able to instantiate', () => {
    expect(new Type(TypeValue.NORMAL))
      .to.be.an.instanceof(Type);
    expect(Type.of(TypeValue.FIGHT))
      .to.be.an.instanceof(Type);
    expect(Type.fromString('ground'))
      .to.be.an.instanceof(Type);
  });

  it('should raise error when instantiate by undeined name', () => {
    expect(() => Type.fromString('unknown'))
      .to.throw(Error);
  });

  it('should verify equivalence', () => {
    let t = new Type(TypeValue.DARK);

    expect(t.is(Type.of(TypeValue.DARK)))
      .to.be.true;
    expect(t.is(Type.of(TypeValue.DRAGON)))
      .to.be.false;
  });

  it('should be able to stringify', () => {
    let t = new Type(TypeValue.FAIRY);
    
    expect(t.toString())
      .to.equal('fairy');
  });

  it('should return logical name', () => {
    let t = new Type(TypeValue.FAIRY);

    expect(t.toLogicalName())
      .to.equal('フェアリー');
  });

});
