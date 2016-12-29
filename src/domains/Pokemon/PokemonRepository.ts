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
      throw new Error('not found');
    }

    return this.inflate(entity);
  }

  public async allWithRelations(): Promise<Pokemon[]> {
    let entities = await this.getRepository()
      .createQueryBuilder('pokemon')
      .leftJoinAndSelect('pokemon.abilities', 'abilities')
      .getMany();

    return entities.map(this.inflate);
  }
}

export default PokemonRepository;
