import Type from 'domains/Type/Type';
import TypeEfficacy from 'domains/Efficacy/TypeEfficacy';

class TypeEfficacyCsvFormatter {
  public static read(row: string): TypeEfficacy {
    let values = row.split(',');

    if (values.length < 3) {
      throw new Error('invalid row');
    }

    let attacker = Type.fromString(values[0]);
    let attackee = Type.fromString(values[1]);
    let rate = parseFloat(values[2]);

    return new TypeEfficacy(attacker, attackee, rate);
  }
}

export default TypeEfficacyCsvFormatter;
