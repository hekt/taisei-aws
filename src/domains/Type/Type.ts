import TypeValue from './TypeValue';

export default class Type {
  /**
   * constructor
   */
  public constructor(
    public readonly value: TypeValue
  ) {}

  /**
   * of
   */
  public static of(value: TypeValue): Type {
    return new Type(value);
  }

  /**
   * of*
   */
  public static ofNone(): Type { return new Type(TypeValue.NONE); }
  public static ofNormal(): Type { return new Type(TypeValue.NORMAL); }
  public static ofFight(): Type { return new Type(TypeValue.FIGHT); }
  public static ofFlying(): Type { return new Type(TypeValue.FLYING); }
  public static ofPoison(): Type { return new Type(TypeValue.POISON); }
  public static ofGround(): Type { return new Type(TypeValue.GROUND); }
  public static ofRock(): Type { return new Type(TypeValue.ROCK); }
  public static ofBug(): Type { return new Type(TypeValue.BUG); }
  public static ofGhost(): Type { return new Type(TypeValue.GHOST); }
  public static ofSteel(): Type { return new Type(TypeValue.STEEL); }
  public static ofFire(): Type { return new Type(TypeValue.FIRE); }
  public static ofWater(): Type { return new Type(TypeValue.WATER); }
  public static ofGrass(): Type { return new Type(TypeValue.GRASS); }
  public static ofElectric(): Type { return new Type(TypeValue.ELECTRIC); }
  public static ofPhychic(): Type { return new Type(TypeValue.PHYCHIC); }
  public static ofIce(): Type { return new Type(TypeValue.ICE); }
  public static ofDragon(): Type { return new Type(TypeValue.DRAGON); }
  public static ofDark(): Type { return new Type(TypeValue.DARK); }
  public static ofFairy(): Type { return new Type(TypeValue.FAIRY); }

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
