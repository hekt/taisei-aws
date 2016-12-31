import Type from '../Type/Type';

class DenormalizedData {
  public constructor(
    public readonly pokemonId: number,
    public readonly ndex: number,
    public readonly name: string,
    public readonly formName: string | null,
    public readonly abilityName: string | null,
    public readonly type1: Type,
    public readonly type2: Type,
    public readonly canEvolve: boolean,
    public readonly normal: number,
    public readonly fight: number,
    public readonly flying: number,
    public readonly poison: number,
    public readonly ground: number,
    public readonly rock: number,
    public readonly bug: number,
    public readonly ghost: number,
    public readonly steel: number,
    public readonly fire: number,
    public readonly water: number,
    public readonly grass: number,
    public readonly electric: number,
    public readonly psychic: number,
    public readonly ice: number,
    public readonly dragon: number,
    public readonly dark: number,
    public readonly fairy: number
  ) {}

  public fullName(): string {
    if (!this.formName) {
      return this.name;
    }
    return `${this.name} (${this.formName})`;
  }
}

export default DenormalizedData;
