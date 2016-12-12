import { Pokemon } from './Pokemon';
export declare class Ability {
    /**
     * Primary key for RDBMS
     */
    id: string;
    /**
     * Ability name
     */
    name: string;
    /**
     * Pokemons that have this ability
     */
    pokemons: Pokemon[];
}
