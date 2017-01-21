import { QueryCollection, Where, Operator } from 'infrastructure/Query';

type Params = {[key: string]: string};

class UrlParametersConverter {
  public static toQueryCollection(params: Params): QueryCollection {
    const keys = [
      'normal', 'fight', 'flying', 'poison', 'ground', 'rock', 'bug',
      'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic',
      'ice', 'dragon', 'dark', 'fairy',
    ];

    let collection = new QueryCollection();

    if (params['finalForm'] && params['finalForm'] === 'true') {
      collection.add(new Where('canEvolve', '=', '0'));
    }

    // 格闘だけなんかおかしかった
    if (params['fighting']) {
      params['fight'] = params['fighting'];
    }

    for (let key of keys) {
      if (!params[key]) {
        continue;
      }

      let [operatorStr, operand] = params[key].split(',');
      let operator = UrlParametersConverter.stringToOperator(operatorStr);
      collection.add(new Where(key, operator, operand));
    }

    return collection;
  }

  private static stringToOperator(str: string): Operator {
    switch (str) {
    case 'eq': return '=';
    case 'lt': return '<';
    case 'gt': return '>';
    case 'lte': return '<=';
    case 'gte': return '>=';
    default: throw new Error('unknown operator string');
    }
  }
}

export default UrlParametersConverter;
