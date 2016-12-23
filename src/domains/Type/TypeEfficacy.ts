import Type from './Type';
import {
  CorrectorInterface,
  SimpleCorrector
} from '../Efficacy/Corrector';

export default class TypeEfficacy {
  public constructor(
    public readonly attacker: Type,
    public readonly attackee: Type,
    public readonly rate: number
  ) {}


  public asCorrector(): CorrectorInterface {
    return new SimpleCorrector(this.attacker, this.rate);
  }
}
