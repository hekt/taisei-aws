import { QueryBuilder } from 'typeorm';

export type Operator = '=' | '!=' | '>' | '>=' | '<' | '<='
  | 'is' | 'is not' | 'in';

export class QueryCollection {
  protected items: Where[] = [];

  public constructor(items?: Where[]) {
    this.items = items || [];
  }

  public add(item: Where) {
    this.items.push(item);
  }

  public build<T>(builder: QueryBuilder<T>): QueryBuilder<T> {
    return this.items.reduce(
      (acc, item) => acc.andWhere(item.query, item.params),
      builder
    );
  }
}

export class Where {
  public readonly query;
  public readonly params = {};

  public constructor(
    left: string,
    operator: Operator,
    right: string | string[] | null
  ) {
    if (Array.isArray(right)) {
      this.query = `${left} ${operator} (:${left})`;
    } else {
      this.query = `${left} ${operator} :${left}`;
    }
    this.params[left] = right;
  }
}
