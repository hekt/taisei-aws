import Container from '../infrastructure/Container';
import ServiceProviderInterface from '../infrastructure/ServiceProviderInterface';
import { createContainer } from './ContainerHelpers';

abstract class Application {
  protected abstract async main(container: Container): Promise<void>;

  protected abstract async getConnectionProviders(): Promise<ServiceProviderInterface[]>;

  public async run(): Promise<void> {
    let container = createContainer();
    container.addProviders(await this.getConnectionProviders());

    return this.main(container);
  }
}

export default Application;
