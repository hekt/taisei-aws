import Container from '../infrastructure/Container';
import ServiceProviderInterface from '../infrastructure/ServiceProviderInterface';
import { createContainer } from './ContainerHelpers';

abstract class Application<A,R> {
  protected abstract async main(
    container: Container,
    arg?: A
  ): Promise<R>;

  protected abstract async getConnectionProviders(): Promise<ServiceProviderInterface[]>;

  public async run(arg?: A): Promise<R> {
    let container = createContainer();

    container.addProviders(await this.getConnectionProviders());

    return this.main(container, arg);
  }
}

export default Application;
