import Repository from 'infrastructure/Repository';
import Ability from 'domains/Ability/Ability';
import AbilityEntity from 'domains/Ability/AbilityEntity';

class AbilityRepository extends Repository<Ability> {
  protected getRepository() {
    return this.connection.getRepository(AbilityEntity);
  }

  protected inflate(entity: AbilityEntity): Ability {
    return entity.inflate();
  }

  protected deflate(model: Ability): AbilityEntity {
    return (new AbilityEntity()).setValuesFromModel(model);
  }
}

export default AbilityRepository;
