import Repository from '../../infrastructure/Repository';
import DenormalizedData from './DenormalizedData';
import DenormalizedDataEntity from './DenormalizedDataEntity';

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
}

export default DenormalizedDataRepository;
