import Type from 'domains/Type/Type';

/**
 * @todo: rate を VO でラップする
 */
export interface CorrectorInterface {
  applyRate(type: Type, rate: number): number;
}

export class PassCorrector implements CorrectorInterface {
  public applyRate(type: Type, rate: number): number {
    return rate;
  }
}

export class SimpleCorrector implements CorrectorInterface {
  constructor(
    private type: Type,
    private correctRate: number
  ) {}

  public applyRate(type: Type, rate: number): number {
    if (type.is(this.type)) {
      return rate * this.correctRate;
    }

    return rate;
  }
}

export class MultipleCorrector implements CorrectorInterface {
  constructor(
    private correctors: CorrectorInterface[]
  ) {}

  public applyRate(type: Type, rate: number): number {
    return this.correctors.reduce((acc, corrector) => {
      return corrector.applyRate(type, acc);
    }, rate);
  }
}

export class MoreOrEqualCorrector implements CorrectorInterface {
  constructor(
    private threshold: number,
    private correctRate: number
  ) {}

  public applyRate(type: Type, rate: number): number {
    if (rate >= this.threshold) {
      return rate * this.correctRate;
    }

    return rate;
  }
}

export class LessCorrector implements CorrectorInterface {
  constructor(
    private threshold: number,
    private correctRate: number
  ) {}

  public applyRate(type: Type, rate: number): number {
    if (rate < this.threshold) {
      return rate * this.correctRate;
    }

    return rate;
  }
}
