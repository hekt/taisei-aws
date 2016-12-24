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

class SecondaryObject {}

class SecondaryServiceProvider extends ServiceProvider<SecondaryObject> {
  public getIdentifier(): string {
    return 'secondaryObject';
  }

  public resolve(container: Container): SecondaryObject {
    return new SecondaryObject();
  }
}

describe('Container', () => {

  it('should be singleton', () => {
    expect(Container.instance())
      .to.be.instanceof(Container);
    expect(Container.instance())
      .to.equal(Container.instance());
  });

  it('should return new instance', () => {
    expect(Container.newInstance())
      .to.be.instanceof(Container);
    expect(Container.newInstance())
      .to.be.not.equal(Container.newInstance());
  });

  it('should receive provider and return provided object', () => {
    let serviceProvider = new ConcreteServiceProvider();
    let container = Container.newInstance();

    container.addProvider(serviceProvider);
    
    expect(container.get<ConcreteObject>('concreteObject'))
      .to.be.instanceof(ConcreteObject);
  });

  it('should receive provider multiply', () => {
    let sp1 = new ConcreteServiceProvider();
    let sp2 = new SecondaryServiceProvider();

    let container = Container.newInstance();
    container
      .addProvider(sp1)
      .addProvider(sp2);

    expect(container.get<ConcreteObject>('concreteObject'))
      .to.be.instanceof(ConcreteObject);
    expect(container.get<SecondaryObject>('secondaryObject'))
      .to.be.instanceof(SecondaryObject);
  });

  it('should receive multiple providers', () => {
    let sp1 = new ConcreteServiceProvider();
    let sp2 = new SecondaryServiceProvider();

    let container = Container.newInstance();
    container.addProviders([sp1, sp2]);

    expect(container.get<ConcreteObject>('concreteObject'))
      .to.be.instanceof(ConcreteObject);
    expect(container.get<SecondaryObject>('secondaryObject'))
      .to.be.instanceof(SecondaryObject);
  });

});
