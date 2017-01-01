import { Connection } from 'typeorm';
import Container from 'infrastructure/Container';
import ServiceProvider from 'infrastructure/ServiceProvider';
import DenormalizedDataRepository from 'domains/Denormalized/DenormalizedDataRepository';

export class DenormalizedDataRepositoryProvider extends ServiceProvider<DenormalizedDataRepository> {
  public getIdentifier(): string {
    return 'denormalizedDataRepository';
  }

  public resolve(container: Container): DenormalizedDataRepository {
    return new DenormalizedDataRepository(
      container.get<Connection>('connection.data')
    )
  }
}
