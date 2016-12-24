import { expect } from 'chai';
import Container from '../../src/infrastructure/Container';
import ServiceProvider from '../../src/infrastructure/ServiceProvider';

class ConcreteObject {}

class ConcreteServiceProvider extends ServiceProvider<ConcreteObject> {
  public getIdentifier(): string {
    return 'concreteObject';
  }

  public resolve(container: Container): ConcreteObject {
    return new ConcreteObject();
  }
}

class DependentObject {
  constructor(public obj: ConcreteObject) {}
}

class DependentServiceProvider extends ServiceProvider<ConcreteObject[]> {
  public getIdentifier(): string {
    return 'dependentObject';
  }

  public resolve(container: Container): DependentObject {
    let obj = container.get<ConcreteObject>('concreteObject');
    return new DependentObject(obj);
  }
}

describe('ServiceProvider', () => {

  it('should return identifier', () => {
    expect(new ConcreteServiceProvider())
      .to.respondTo('getIdentifier');
  });

  it('should provide object', () => {
    let container = Container.newInstance();
    let sp = new ConcreteServiceProvider();

    expect(sp.provide(container))
      .to.be.instanceof(ConcreteObject);
  });

  it('should resolve dependency', () => {
    let container = Container.newInstance();
    let csp = new ConcreteServiceProvider();
    let dsp = new DependentServiceProvider();

    container.addProvider(csp)

    expect(dsp.provide(container))
      .to.be.instanceof(DependentObject);
  });

});
