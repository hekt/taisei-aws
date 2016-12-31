import { Where } from '../infrastructure/Query';

let available_keys = [
  'finalForm',
  'normal',
  'fight',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

class QueryConverter {
  public static urlParamsToWheres(params: {[key: string]: string}): Where[] {
    let wheres: Where[] = [];
    for (let key in params) {
      if (key === 'finalForm') {
        if (params[key] === 'true') {
          wheres.push({
            query: 'canEvolve = :canEvolve',
            params: {
              'canEvolve': '0'
            },
          });
        }
        continue;
      }
      wheres.push(QueryConverter.urlParamToWhere(key, params[key]));
    }
    return wheres;
  }

  private static urlParamToWhere(key: string, val: string): Where {
    if (-1 === available_keys.indexOf(key)) {
      throw new Error('unavailable key');
    }

    return QueryConverter.csvToQuery(key, val);
  }

  private static csvToQuery(key: string, csv: string): Where {
    let [operator, operand] = csv.split(',');

    switch (operator) {
    case 'lte': return QueryConverter.whereLte(key, operand);
    case 'lt': return QueryConverter.whereLt(key, operand);
    case 'gte': return QueryConverter.whereGte(key, operand);
    case 'gt': return QueryConverter.whereGt(key, operand);
    case 'eq': return QueryConverter.whereEq(key, operand);
    default:
      throw new Error('unexpected operator');
    }
  }

  private static whereLte(key: string, val: string): Where {
    let params = {};
    params[key] = val;
    return {
      query: `${key} <= :${key}`,
      params: params,
    }
  }

  private static whereLt(key: string, val: string): Where {
    let params = {};
    params[key] = val;
    return {
      query: `${key} < :${key}`,
      params: params,
    };
  }

  private static whereGte(key: string, val: string): Where {
    let params = {};
    params[key] = val;
    return {
      query: `${key} >= :${key}`,
      params: params,
    };
  }

  private static whereGt(key: string, val: string): Where {
    let params = {};
    params[key] = val;
    return {
      query: `${key} > :${key}`,
      params: params,
    };
  }

  private static whereEq(key: string, val: string): Where {
    let params = {};
    params[key] = val;
    return {
      query: `${key} = :${key}`,
      params: params,
    };
  }
}

export default QueryConverter;
