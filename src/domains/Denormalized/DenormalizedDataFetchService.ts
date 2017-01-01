import * as _ from 'lodash';
import { QueryCollection } from 'infrastructure/Query';
import DenormalizedData from 'domains/Denormalized/DenormalizedData';
import DenormalizedDataRepository from 'domains/Denormalized/DenormalizedDataRepository';

class DenormalizedDataFetchService {
  constructor(
    private denormalizedDataRepository: DenormalizedDataRepository
  ) {}

  public async fetchByQueryCollection(
    queryCollection: QueryCollection
  ): Promise<DenormalizedData[]> {
    const data: DenormalizedData[] = await this.denormalizedDataRepository
      .getByQueryCollection(queryCollection);

    return _.chain(data)
      .groupBy((d) => d.ndex + d.formName)
      .flatMap((ds) => {
        let first = _.find(ds, (d) => d.abilityName === null);
        if (first) {
          return [first];
        } else {
          return ds;
        }
      })
      .orderBy([
        'ndex',
        'name',
        (x) => x.formName === null ? '' : x.formName
      ])
      .value();
  }
}

export default DenormalizedDataFetchService;
