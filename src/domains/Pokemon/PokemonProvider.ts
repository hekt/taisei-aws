import { Connection } from 'typeorm';
import Container from 'infrastructure/Container';
import ServiceProvider from 'infrastructure/ServiceProvider';
import PokemonRepository from 'domains/Pokemon/PokemonRepository';

export class PokemonRepositoryProvider extends ServiceProvider<PokemonRepository> {
  public getIdentifier(): string {
    return 'pokemonRepository';
  }

  public resolve(container: Container): PokemonRepository {
    return new PokemonRepository(
      container.get<Connection>('connection.master')
    )
  }
}
