import Container from 'infrastructure/Container';
import {
  AbilityRepositoryProvider
} from 'domains/Ability/AbilityProvider';
import {
  DenormalizedDataRepositoryProvider,
  DenormalizedDataFetchServiceProvider,
} from 'domains/Denormalized/DenormalizedProvider';
import {
  PokemonRepositoryProvider
} from 'domains/Pokemon/PokemonProvider';
import {
  TypeEfficacyRepositoryProvider,
  CorrectorFactoryProvider
} from 'domains/Efficacy/EfficacyProvider';
import {
  DenormalizeServiceProvider
} from 'applications/DenormalizeServiceProvider';

export function createContainer() {
  let container = Container.instance();

  container.addProviders([
    // repositories
    new AbilityRepositoryProvider(),
    new PokemonRepositoryProvider(),
    new TypeEfficacyRepositoryProvider(),
    new DenormalizedDataRepositoryProvider(),

    // domain services
    new DenormalizedDataFetchServiceProvider(),

    // factories
    new CorrectorFactoryProvider(),

    // application services
    new DenormalizeServiceProvider(),
  ]);

  return container;
}
