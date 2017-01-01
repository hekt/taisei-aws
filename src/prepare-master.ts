import * as fs from 'fs';

import Container from 'infrastructure/Container';
import Application from 'applications/Application';
import { getMasterConnectionOptions } from 'applications/Connection';
import PokemonRepository from 'domains/Pokemon/PokemonRepository';
import TypeEfficacyRepository from 'domains/Efficacy/TypeEfficacyRepository';
import PokemonCsvReader from 'applications/Reader/PokemonCsvReader';
import TypeEfficacyCsvReader from 'applications/Reader/TypeEfficacyCsvReader';

class App extends Application<void, void> {
  protected connectionOptions() {
    return [
      getMasterConnectionOptions(true),
    ];
  }

  protected async main(container: Container): Promise<void> {
    const efficacyPath = './resources/type_efficacy.csv';
    const pokemonPath = './resources/pokemon.csv';

    const efficacyLines = fs.readFileSync(efficacyPath, {'encoding': 'utf-8'})
      .split('\r\n');
    const typeEfficacyRepository = container
      .get<TypeEfficacyRepository>('typeEfficacyRepository');
    await typeEfficacyRepository.transaction(async (repo) => {
      let efficacy;
      for (let line of efficacyLines) {
        efficacy = TypeEfficacyCsvReader.read(line);
        await repo.persist(efficacy);
      }
    });

    const pokemonLines = fs.readFileSync(pokemonPath, {'encoding': 'utf-8'})
      .split('\r\n');
    const pokemonRepository = container
      .get<PokemonRepository>('pokemonRepository');
    await pokemonRepository.transaction(async (repo) => {
      let pokemon;
      for (let line of pokemonLines) {
        pokemon = PokemonCsvReader.read(line);
        await repo.persist(pokemon);
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
