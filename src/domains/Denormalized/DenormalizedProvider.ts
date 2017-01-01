import { Connection } from 'typeorm';
import Container from 'infrastructure/Container';
import ServiceProvider from 'infrastructure/ServiceProvider';
import DenormalizedDataRepository from 'domains/Denormalized/DenormalizedDataRepository';
import DenormalizedDataFetchService from 'domains/Denormalized/DenormalizedDataFetchService';

export class DenormalizedDataRepositoryProvider extends ServiceProvider<DenormalizedDataRepository> {
  public getIdentifier() {
    return 'denormalizedDataRepository';
  }

  public resolve(container: Container) {
    return new DenormalizedDataRepository(
      container.get<Connection>('connection.data')
    );
  }
}

export class DenormalizedDataFetchServiceProvider extends ServiceProvider<DenormalizedDataFetchService> {
  public getIdentifier() {
    return 'denormalizedDataFetchService';
  }

  public resolve(container: Container) {
    return new DenormalizedDataFetchService(
      container.get<DenormalizedDataRepository>('denormalizedDataRepository')
    );
  }
}
