import Repository from '../../infrastructure/Repository';
import { Where } from '../../infrastructure/Query';
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

  public async getByWheres(wheres: Where[]): Promise<DenormalizedData[]> {
    let query = this.getRepository()
      .createQueryBuilder('denormalized_data');

    let firstWhere = true;
    for (let w of wheres) {
      if (firstWhere) {
        query = query.where(w['query'], w['params']);
        firstWhere = false;
      } else {
        query = query.andWhere(w['query'], w['params']);
      }
    }

    let entities = await query
      // .orderBy('ndex')
      // .addOrderBy('formName')
      .getMany();

    return entities.map(this.inflate);
  }
}

export default DenormalizedDataRepository;
