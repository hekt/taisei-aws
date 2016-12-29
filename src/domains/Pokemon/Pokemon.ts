import Type from "../Type/Type";
import Ability from '../Ability/Ability';

export default class Pokemon {
  constructor(
    public readonly id: number | null,
    public readonly ndex: number,
    public readonly name: string,
    public readonly formName: string | null,
    public readonly canEvolve: boolean,
    public readonly type1: Type,
    public readonly type2: Type,
    public readonly abilities: Ability[] = []
  ) {}

  public fullName(): string {
    if (this.formName === null) {
      return this.name;
    }
    return `${this.name} (${this.formName})`;
  }

  public types(): Type[] {
    return [this.type1, this.type2];
  }
}
