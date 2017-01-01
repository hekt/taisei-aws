import Ability from 'domains/Ability/Ability';
import DenormalizedData from 'domains/Denormalized/DenormalizedData';
import Type from 'domains/Type/Type';
import Pokemon from 'domains/Pokemon/Pokemon';
import { CorrectorInterface } from 'domains/Efficacy/Corrector';
import CorrectorFactory from 'domains/Efficacy/CorrectorFactory';

class DenormalizeService {
  public constructor(
    private readonly correctorFactory: CorrectorFactory
  ) {}

  public async denormalize(
    pokemon: Pokemon
  ): Promise<DenormalizedData[]> {
    let corrector;
    let results: DenormalizedData[] = [];

    // 特性なしの場合
    corrector = await this.correctorFactory.create(pokemon.types(), null);
    results.push(this.buildData(corrector, pokemon, null));

    // 特性ありの場合
    for (let ability of pokemon.abilities) {
      corrector = await this.correctorFactory.create(pokemon.types(), ability);
      results.push(this.buildData(corrector, pokemon, ability));
    }

    return results;
  }

  private buildData(
    corrector: CorrectorInterface,
    pokemon: Pokemon,
    ability: Ability | null
  ): DenormalizedData {
    return new DenormalizedData(
      pokemon.id!,
      pokemon.ndex,
      pokemon.name,
      pokemon.formName,
      ability === null ? null : ability.logicalName,
      pokemon.type1,
      pokemon.type2,
      pokemon.canEvolve,
      corrector.applyRate(Type.ofNormal(), 1.0),
      corrector.applyRate(Type.ofFight(), 1.0),
      corrector.applyRate(Type.ofFlying(), 1.0),
      corrector.applyRate(Type.ofPoison(), 1.0),
      corrector.applyRate(Type.ofGround(), 1.0),
      corrector.applyRate(Type.ofRock(), 1.0),
      corrector.applyRate(Type.ofBug(), 1.0),
      corrector.applyRate(Type.ofGhost(), 1.0),
      corrector.applyRate(Type.ofSteel(), 1.0),
      corrector.applyRate(Type.ofFire(), 1.0),
      corrector.applyRate(Type.ofWater(), 1.0),
      corrector.applyRate(Type.ofGrass(), 1.0),
      corrector.applyRate(Type.ofElectric(), 1.0),
      corrector.applyRate(Type.ofPsychic(), 1.0),
      corrector.applyRate(Type.ofIce(), 1.0),
      corrector.applyRate(Type.ofDragon(), 1.0),
      corrector.applyRate(Type.ofDark(), 1.0),
      corrector.applyRate(Type.ofFairy(), 1.0)
    );
  }
}

export default DenormalizeService;
