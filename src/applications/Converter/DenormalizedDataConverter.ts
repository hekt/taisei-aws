import DenormalizedDataInterface from 'domains/Denormalized/DenormalizedDataInterface';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

class DenormalizedDataConverter {
  public static toJson(data: DenormalizedDataInterface): Object {
    return {
      'number': data.ndex,
      'name': data.fullName(),
      'ability': null === data.abilityName ? '' : data.abilityName,
      'type1': capitalize(data.type1.toString()),
      'type2': capitalize(data.type2.toString()),
      'mega': false, // 使ってる？
    }
  }
}

export default DenormalizedDataConverter;
