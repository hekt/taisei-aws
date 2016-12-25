import DenormalizedData from '../domains/Denormalized/DenormalizedData';

class ResponseFormatter {
  public static format(data: DenormalizedData): Object {
    return {
      'number': data.ndex,
      'name': data.fullName(),
      'ability': null === data.abilityName ? '' : data.abilityName,
      'type1': ResponseFormatter.capitalize(data.type1.toString()),
      'type2': ResponseFormatter.capitalize(data.type2.toString()),
      'mega': false, // 使ってる？
    }
  }

  private static capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default ResponseFormatter;
