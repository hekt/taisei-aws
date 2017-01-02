import Type from 'domains/Type/Type';
import TypeValue from 'domains/Type/TypeValue';
import DenormalizedDataInterface from 'domains/Denormalized/DenormalizedDataInterface';

interface RawCompressedData {
  ndex: number;
  name: string;
  formName: string | null;
  abilityName: string | null;
  type1: TypeValue;
  type2: TypeValue;
}

class CompressedData implements DenormalizedDataInterface {
  public constructor(
    public readonly ndex: number,
    public readonly name: string,
    public readonly formName: string | null,
    public readonly abilityName: string | null,
    public readonly type1: Type,
    public readonly type2: Type
  ) {}

  public static fromRaw(obj: RawCompressedData): CompressedData {
    return new CompressedData(
      obj['ndex'],
      obj['name'],
      obj['formName'],
      obj['abilityName'],
      Type.of(obj['type1']),
      Type.of(obj['type2']),
    );
  }

  public fullName(): string {
    if (!this.formName) {
      return this.name;
    }
    return `${this.name} (${this.formName})`;
  }
}

export default CompressedData;
