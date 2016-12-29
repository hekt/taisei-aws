import {
  createContainer,
  getMasterConnectionProvider,
  getDataConnectionProvider
} from './applications/ContainerHelpers';
import PokemonRepository from './domains/Pokemon/PokemonRepository';
import DenormalizedDataRepository from './domains/Denormalized/DenormalizedDataRepository';
import DenormalizeService from './applications/DenormalizeService';

async function main() {
  let container = createContainer();
  container.addProviders([
    await getMasterConnectionProvider(),
    await getDataConnectionProvider(),
  ]);

  let pokemonRepository = container
    .get<PokemonRepository>('pokemonRepository');
  let pokemons = await pokemonRepository.allWithRelations();

  let denormalizedDataRepository = container
    .get<DenormalizedDataRepository>('denormalizedDataRepository');

  let denormalizeService = container
    .get<DenormalizeService>('denormalizeService');

  let denormalized;
  await denormalizedDataRepository.transaction(async (repo) => {
    for (let pokemon of pokemons) {
      denormalized = await denormalizeService.denormalize(pokemon);
      for (let d of denormalized) {
        await repo.persist(d);
      }
    }
  });
}

main().then(() => {
  console.log('success');
}).catch((err) => {
  console.error(err.stack);
});
