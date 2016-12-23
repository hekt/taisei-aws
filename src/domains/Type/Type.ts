import TypeValue from './TypeValue';

export default class Type {
  /**
   * constructor
   */
  public constructor(
    private value: TypeValue
  ) {}

  /**
   * of
   */
  public static of(value: TypeValue): Type {
    return new Type(value);
  }

  /**
   * is
   */
  public is(other: Type): boolean {
    return this.value === other.value;
  }

  /**
   * toString
   */
  public toString(): string {
    return TypeValue[this.value].toLowerCase();
  }

  /**
   * toLogicalName
   */
  public toLogicalName(): string {
    switch (this.value) {
    case TypeValue.NONE: return 'なし';
    case TypeValue.NORMAL: return 'ノーマル';
    case TypeValue.FIGHT: return 'かくとう';
    case TypeValue.FLYING: return 'ひこう';
    case TypeValue.POISON: return 'どく';
    case TypeValue.GROUND: return 'じめん'
    case TypeValue.ROCK: return 'いわ';
    case TypeValue.BUG: return 'むし';
    case TypeValue.GHOST: return 'ゴースト';
    case TypeValue.STEEL: return 'はがね';
    case TypeValue.FIRE: return 'ほのお';
    case TypeValue.WATER: return 'みず';
    case TypeValue.GRASS: return 'くさ';
    case TypeValue.ELECTRIC: return 'でんき';
    case TypeValue.PHYCHIC: return 'エスパー';
    case TypeValue.ICE: return 'こおり';
    case TypeValue.DRAGON: return 'ドラゴン';
    case TypeValue.DARK: return 'あく';
    case TypeValue.FAIRY: return 'フェアリー';
    }
  }
}
