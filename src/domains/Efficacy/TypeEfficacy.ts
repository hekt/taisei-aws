import Type from 'domains/Type/Type';

export default class TypeEfficacy {
  public constructor(
    public readonly attacker: Type,
    public readonly attackee: Type,
    public readonly rate: number
  ) {}
}
