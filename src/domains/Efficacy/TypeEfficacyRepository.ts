import Repository from 'infrastructure/Repository';
import Type from 'domains/Type/Type';
import TypeEfficacy from 'domains/Efficacy/TypeEfficacy';
import TypeEfficacyEntity from 'domains/Efficacy/TypeEfficacyEntity';

class TypeEfficacyRepository extends Repository<TypeEfficacy> {
  protected getRepository() {
    return this.connection.getRepository(TypeEfficacyEntity);
  }

  protected inflate(entity: TypeEfficacyEntity): TypeEfficacy {
    return entity.inflate();
  }

  protected deflate(model: TypeEfficacy): TypeEfficacyEntity {
    return (new TypeEfficacyEntity()).setValuesFromModel(model);
  }

  public async collectByAttackeeTypes(
    types: Type[]
  ): Promise<TypeEfficacy[]> {
    let typeValues = types.map(t => t.value);

    let entities = await this.getRepository()
      .createQueryBuilder('type_efficacy')
      .where('attackee in (:types)', {types: typeValues})
      .getMany();

    return entities.map(this.inflate);
  }
}

export default TypeEfficacyRepository;
