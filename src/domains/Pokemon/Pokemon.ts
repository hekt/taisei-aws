import Type from "../Type/Type";
import Ability from '../Ability/Ability';

export default class Pokemon {
  /**
   * constructor
   */
  constructor(
    public readonly ndex: number,
    public readonly name: string,
    public readonly formName: string | null,
    public readonly canEvolve: boolean,
    public readonly type1: Type,
    public readonly type2: Type,
    public readonly abilities: Ability[] = []
  ) {
    this.ndex = ndex;
    this.name = name;
    this.canEvolve = canEvolve;
    this.type1 = type1;
    this.type2 = type2;
    this.abilities = abilities;
  }

  /**
   * fullName
   */
  public fullName(): string {
    if (this.formName === null) {
      return this.name;
    }
    return `${this.name} (${this.formName})`;
  }
}
