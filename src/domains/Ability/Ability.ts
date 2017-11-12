export default class Ability {
  /**
   * constructor
   */
  public constructor(
    public readonly name: string,
    public readonly logicalName: string
  ) {}

  /**
   * fromLogicalName
   */
  public static fromLogicalName(logicalName: string): Ability {
    let name: string;
    switch (logicalName) {
    case 'たいねつ':
      name = 'heatproof';
      break;
    case 'すいほう':
      name = 'water_bubble';
      break;
    case 'もらいび':
      name = 'flash_fire';
      break;
    case 'そうしょく':
      name = 'sap_sipper';
      break;
    case 'ちょすい':
      name = 'water_absorb';
      break;
    case 'よびみず':
      name = 'storm_drain';
      break;
    case 'ちくでん':
      name = 'bolt_absorb';
      break;
    case 'ひらいしん':
      name = 'lightning_lod';
      break;
    case 'でんきエンジン':
      name = 'motor_drive';
      break;
    case 'ふゆう':
      name = 'levitate';
      break;
    case 'あついしぼう':
      name = 'thick_fat';
      break;
    case 'かんそうはだ':
      name = 'dry_skin';
      break;
    case 'ハードロック':
      name = 'solid_rock';
      break;
    case 'フィルター':
      name = 'filter';
      break;
    case 'プリズムアーマー':
      name = 'prism_armor';
      break;
    case 'ふしぎなまもり':
      name = 'wonder_guard';
      break;
    case 'もふもふ':
      name = 'fluffy';
      break;
    default:
      throw new Error('undefined logical name: ' + logicalName);
    }

    return new Ability(name, logicalName);
  }
}
