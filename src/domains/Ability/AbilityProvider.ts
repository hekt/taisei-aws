import { Connection } from 'typeorm';
import Container from '../../infrastructure/Container';
import ServiceProvider from '../../infrastructure/ServiceProvider';
import AbilityRepository from './AbilityRepository';

export class AbilityRepositoryProvider extends ServiceProvider<AbilityRepository> {
  public getIdentifier(): string {
    return 'abilityRepository';
  }

  public resolve(container: Container): AbilityRepository {
    return new AbilityRepository(
      container.get<Connection>('connection.master')
    )
  }
}
