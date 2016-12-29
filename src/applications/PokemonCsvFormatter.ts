import Ability from '../domains/Ability/Ability';
import Pokemon from '../domains/Pokemon/Pokemon';
import Type from '../domains/Type/Type';

class PokemonCsvFormatter {
  public static read(row: string): Pokemon {
    let values = row.split(',');

    if (values.length < 6) {
      throw new Error('invalid row');
    }

    let ndex = parseInt(values[0]);
    let name = values[1];
    let type1 = Type.fromString(values[2]);
    let type2 = Type.fromString(values[3]);
    let canEvolve = values[4] === 't';
    let formName = values[5] === '' ? null : values[5];
    let abilities = values.slice(6)
      .filter((v: string) => {
        return v !== '';
      })
      .map((v: string) => {
        return Ability.fromLogicalName(v);
      });

    return new Pokemon(
      null,
      ndex,
      name,
      formName,
      canEvolve,
      type1,
      type2,
      abilities
    );
  }
}

export default PokemonCsvFormatter;
