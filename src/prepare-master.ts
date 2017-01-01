import * as fs from 'fs';

import Container from './infrastructure/Container';
import Application from './applications/Application';
import { getMasterConnectionOptions } from './applications/Connection';
import PokemonRepository from './domains/Pokemon/PokemonRepository';
import TypeEfficacyRepository from './domains/Efficacy/TypeEfficacyRepository';
import PokemonCsvFormatter from './applications/PokemonCsvFormatter';
import TypeEfficacyCsvFormatter from './applications/TypeEfficacyCsvFormatter';

class App extends Application<void, void> {
  protected connectionOptions() {
    return [
      getMasterConnectionOptions(true),
    ];
  }

  protected async main(container: Container): Promise<void> {
    let efficacyPath = './resources/type_efficacy.csv';
    let pokemonPath = './resources/pokemon.csv';

    let efficacyLines = fs.readFileSync(efficacyPath, {'encoding': 'utf-8'})
      .split('\r\n');
    let typeEfficacyRepository = container
      .get<TypeEfficacyRepository>('typeEfficacyRepository');
    await typeEfficacyRepository.transaction(async (repo) => {
      let efficacy;
      for (let line of efficacyLines) {
        efficacy = TypeEfficacyCsvFormatter.read(line);
        await repo.persist(efficacy);
      }
    });

    let pokemonLines = fs.readFileSync(pokemonPath, {'encoding': 'utf-8'})
      .split('\r\n');
    let pokemonRepository = container
      .get<PokemonRepository>('pokemonRepository');
    await pokemonRepository.transaction(async (repo) => {
      let pokemon;
      for (let line of pokemonLines) {
        pokemon = PokemonCsvFormatter.read(line);
        await repo.persist(pokemon);
      }
    });
  }
}

let app = new App();
app.run().then(() => {
  console.log('success');
}).catch((err) => {
  console.error(err.stack);
});
