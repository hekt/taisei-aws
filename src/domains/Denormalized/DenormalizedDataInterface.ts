import Type from 'domains/Type/Type';

interface DenormalizedDataInterface {
  ndex: number;
  name: string;
  formName: string | null;
  abilityName: string | null;
  type1: Type;
  type2: Type;

  fullName(): string;
}

export default DenormalizedDataInterface;
