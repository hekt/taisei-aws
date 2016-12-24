import { Connection } from 'typeorm';
import Repository from '../../infrastructure/Repository';
import Ability from './Ability';
import AbilityEntity from './AbilityEntity';

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
