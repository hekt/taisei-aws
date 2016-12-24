import { Connection } from 'typeorm';
import Repository from '../../infrastructure/Repository';
import Pokemon from './Pokemon';
import PokemonEntity from './PokemonEntity';

class PokemonRepository extends Repository<Pokemon> {
  protected getRepository() {
    return this.connection.getRepository(PokemonEntity);
  }

  protected inflate(entity: PokemonEntity): Pokemon {
    return entity.inflate();
  }

  protected deflate(model: Pokemon): PokemonEntity {
    return (new PokemonEntity()).setValuesFromModel(model);
  }

  public async findById(id: number): Promise<Pokemon> {
    let entity: PokemonEntity | undefined
      = await this.getRepository().findOneById(id);

    if (entity === undefined) {
      return Promise.reject('not found');
    }

    return Promise.resolve(this.inflate(entity));
  }
}

export default PokemonRepository;