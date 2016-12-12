import { Ability } from './Ability';
import { Type } from './Type';
export declare class Pokemon {
    /**
     * Primary key for RDBMS
     */
    id: number;
    /**
     * National pokedex number
     */
    ndex: number;
    /**
     * Pokemon name
     */
    name: string;
    /**
     * Can evolve to next form
     */
    canEvolve: boolean;
    /**
     * Primary type
     */
    type1: Type;
    /**
     * Secondary type
     */
    type2: Type | null;
    /**
     * Special abilities
     */
    abilities: Ability[];
    /**
     * constructor
     */
    constructor(id: number, ndex: number, name: string, canEvolve: boolean, type1: Type, type2: Type | null, abilities: Ability[]);
    /**
     * getEfficacyBy
     */
    getTypeEfficacyBy(attacker: Type): number;
}
