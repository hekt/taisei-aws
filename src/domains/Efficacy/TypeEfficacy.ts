import Type from '../Type/Type';

export default class TypeEfficacy {
  public constructor(
    public readonly attacker: Type,
    public readonly attackee: Type,
    public readonly rate: number
  ) {}
}
