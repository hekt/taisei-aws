import { Connection } from 'typeorm';
import Container from 'infrastructure/Container';
import ServiceProvider from 'infrastructure/ServiceProvider';
import TypeEfficacyRepository from 'domains/Efficacy/TypeEfficacyRepository';
import CorrectorFactory from 'domains/Efficacy/CorrectorFactory';

export class TypeEfficacyRepositoryProvider extends ServiceProvider<TypeEfficacyRepository> {
  public getIdentifier(): string {
    return 'typeEfficacyRepository';
  }

  public resolve(container: Container): TypeEfficacyRepository {
    return new TypeEfficacyRepository(
      container.get<Connection>('connection.master')
    )
  }
}

export class CorrectorFactoryProvider extends ServiceProvider<CorrectorFactory> {
  public getIdentifier(): string {
    return 'correctorFactory';
  }

  public resolve(container: Container): CorrectorFactory {
    return new CorrectorFactory(
      container.get<TypeEfficacyRepository>('typeEfficacyRepository')
    );
  }
}
