import ServiceProviderInterface from './ServiceProviderInterface';
import Container from './Container';

abstract class ServiceProvider<T> implements ServiceProviderInterface {
  private resolvedInstance: T | null;

  public abstract getIdentifier(): string;
  public abstract resolve<T>(container: Container): T

  public provide(container: Container): T {
    return this.resolvedInstance = this.resolvedInstance
      || this.resolve<T>(container);
  }
}

export default ServiceProvider;
