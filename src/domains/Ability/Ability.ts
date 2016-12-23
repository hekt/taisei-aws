import Type from '../Type/Type';
import TypeValue from '../Type/TypeValue';
import {
  CorrectorInterface,
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from '../Efficacy/Corrector';

export default class Ability {
  /**
   * constructor
   */
  public constructor(
    public readonly name: string,
    public readonly logicalName: string
  ) {}

  /**
   * corrector
   *
   * @todo: ストリングリテラルにする？
   */
  public corrector(): CorrectorInterface {
    switch (this.name) {
    case 'heatproof':
      return new SimpleCorrector(Type.of(TypeValue.FIRE), 0.5);
    case 'flash_fire':
      return new SimpleCorrector(Type.of(TypeValue.FIRE), 0.0);
    case 'sap_sipper':
      return new SimpleCorrector(Type.of(TypeValue.GRASS), 0.0);
    case 'water_absorb':
    case 'storm_drain':
      return new SimpleCorrector(Type.of(TypeValue.WATER), 0.0);
    case 'bolt_absorb':
    case 'lightning_lod':
    case 'motor_drive':
      return new SimpleCorrector(Type.of(TypeValue.ELECTRIC), 0.0);
    case 'levitate':
      return new SimpleCorrector(Type.of(TypeValue.GROUND), 0.0);
    case 'thick_fat':
      return new MultipleCorrector([
        new SimpleCorrector(Type.of(TypeValue.FIRE), 0.5),
        new SimpleCorrector(Type.of(TypeValue.ICE), 0.5),
      ]);
    case 'dry_skin':
      return new MultipleCorrector([
        new SimpleCorrector(Type.of(TypeValue.FIRE), 1.25),
        new SimpleCorrector(Type.of(TypeValue.WATER), 0.0),
      ]);
    case 'solid_rock':
    case 'filter':
    case 'prism_armor':
      return new MoreOrEqualCorrector(2.0, 0.75);
    case 'wonder_guard':
      return new LessCorrector(2.0, 0.0);
    default:
      return new PassCorrector();
    }
  }
}
