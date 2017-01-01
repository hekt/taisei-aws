import ServiceProviderInterface from './ServiceProviderInterface';
import Container from 'infrastructure/Container';

abstract class ServiceProvider<T> implements ServiceProviderInterface {
  private resolvedInstance: T | null = null;

  public abstract getIdentifier(): string;
  public abstract resolve<T>(container: Container): T;

  public cleanup(): void {};

  public provide(container: Container): T {
    return this.resolvedInstance = this.resolvedInstance
      || this.resolve<T>(container);
  }
}

export default ServiceProvider;
