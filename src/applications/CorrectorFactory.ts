import Ability from '../domains/Ability/Ability';
import Pokemon from '../domains/Pokemon/Pokemon';
import Type from '../domains/Type/Type';
import TypeValue from '../domains/Type/TypeValue';
import TypeEfficacy from '../domains/Type/TypeEfficacy';
import TypeEfficacyRepository from '../domains/Type/TypeEfficacyRepository';
import {
  CorrectorInterface,
  PassCorrector,
  SimpleCorrector,
  MultipleCorrector,
  MoreOrEqualCorrector,
  LessCorrector
} from '../domains/Efficacy/Corrector';

class CorrectorFactory {
  public constructor(
    private readonly typeEfficacyRepository: TypeEfficacyRepository
  ) {}

  public async createByPokemon(
    pokemon: Pokemon,
    ability: Ability | null
  ): Promise<CorrectorInterface> {
    let typeEfficacies = await this.typeEfficacyRepository
      .collectByAttackeeTypes(pokemon.types());

    let correctors: CorrectorInterface[] = [];

    for (let e of typeEfficacies) {
      correctors.push(CorrectorFactory.provideByTypeEfficacy(e));
    }

    if (null !== ability) {
      correctors.push(CorrectorFactory.provideByAbility(ability));
    }

    return new MultipleCorrector(correctors);
  }

  private static provideByTypeEfficacy(
    typeEfficacy: TypeEfficacy
  ): CorrectorInterface {
    return new SimpleCorrector(
      typeEfficacy.attacker,
      typeEfficacy.rate
    );
  }
  
  /**
   * @todo: ストリングリテラルにする？
   */
  private static provideByAbility(
    ability: Ability
  ): CorrectorInterface {
    switch (ability.name) {
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

export default CorrectorFactory;
