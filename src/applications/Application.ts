import {
  ConnectionManager,
  getConnectionManager,
  Connection,
  ConnectionOptions
} from 'typeorm';
import Container from 'infrastructure/Container';
import ConnectionProvider from 'infrastructure/ConnectionProvider';
import { createContainer } from 'applications/ContainerHelpers';

abstract class Application<A,R> {
  protected connectionManager: ConnectionManager;
  protected container: Container;

  public constructor() {
    this.connectionManager = getConnectionManager();
  }

  protected async getConnectionProviders(): Promise<ConnectionProvider[]> {
    let providers: ConnectionProvider[] = [];
    let connection: Connection;

    for (let options of this.connectionOptions()) {
      if (!options.name) {
        throw new Error('connection name required');
      }

      if (this.connectionManager.has(options.name)) {
        connection = this.connectionManager.get(options.name);
      } else {
        connection = await this.connectionManager.createAndConnect(options);
      }

      providers.push(new ConnectionProvider(
        options.name,
        connection
      ));
    }

    return providers;
  }

  protected async getContainer(): Promise<Container> {
    if (!this.container) {
      this.container = createContainer();
      this.container.addProviders(await this.getConnectionProviders());
    }

    return this.container;
  }

  public async run(arg?: A): Promise<R> {
    return this.main(await this.getContainer(), arg);
  }

  /**
   * abstracts
   */
  protected abstract connectionOptions(): ConnectionOptions[];
  protected abstract async main(
    container: Container,
    arg?: A
  ): Promise<R>;
}

export default Application;
