import { Connection } from 'typeorm';
import ServiceProvider from 'infrastructure/ServiceProvider';
import Container from 'infrastructure/Container';

class ConnectionProvider extends ServiceProvider<Connection> {
  public constructor(
    protected readonly identifier: string,
    protected readonly connection: Connection,
  ) {
    super();
  }

  public getIdentifier(): string {
    return this.identifier;
  };

  public resolve(container: Container): Connection {
    return this.connection;
  }
}

export default ConnectionProvider;
