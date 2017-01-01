import Container from 'infrastructure/Container';
import {
  getMasterConnectionOptions,
  getDataConnectionOptions
} from 'applications/Connection';
import Application from 'applications/Application';
import PokemonRepository from 'domains/Pokemon/PokemonRepository';
import DenormalizedDataRepository from 'domains/Denormalized/DenormalizedDataRepository';
import DenormalizeService from 'applications/DenormalizeService';

class App extends Application<void, void> {
  protected connectionOptions() {
    return [
      getMasterConnectionOptions(false),
      getDataConnectionOptions(true),
    ];
  }

  protected async main(container: Container): Promise<void> {
    const pokemonRepository = container
      .get<PokemonRepository>('pokemonRepository');
    const pokemons = await pokemonRepository.allWithRelations();

    const denormalizedDataRepository = container
      .get<DenormalizedDataRepository>('denormalizedDataRepository');

    const denormalizeService = container
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
}

const app = new App();
app.run().then(() => {
  console.log('success');
}).catch((err) => {
  console.error(err.stack);
});
