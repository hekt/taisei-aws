import Repository from 'infrastructure/Repository';
import { QueryCollection } from 'infrastructure/Query';
import CompressedData from 'domains/Denormalized/CompressedData';
import DenormalizedData from 'domains/Denormalized/DenormalizedData';
import DenormalizedDataEntity from 'domains/Denormalized/DenormalizedDataEntity';

class DenormalizedDataRepository extends Repository<DenormalizedData> {
  protected getRepository() {
    return this.connection.getRepository(DenormalizedDataEntity);
  }

  protected inflate(entity: DenormalizedDataEntity): DenormalizedData {
    return entity.inflate();
  }

  protected deflate(model: DenormalizedData): DenormalizedDataEntity {
    return (new DenormalizedDataEntity()).setValuesFromModel(model);
  }

  public async getByQueryCollection(
    collection: QueryCollection
  ): Promise<DenormalizedData[]> {
    let query = this.getRepository().createQueryBuilder('denormalized_data');
    query = collection.build(query);

    let entities = await query.getMany();

    return entities.map(this.inflate);
  }

  public async getAsCompressedByQueryCollection(
    collection: QueryCollection
  ): Promise<CompressedData[]> {
    let query = this.getRepository()
      .createQueryBuilder('denormalized_data')
      .select(['ndex', 'name', 'formName', 'abilityName', 'type1', 'type2']);

    query = collection.build(query);

    let entities = await query.getRawMany();

    return entities.map(CompressedData.fromRaw);
  }
}

export default DenormalizedDataRepository;
