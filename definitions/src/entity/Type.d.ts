import { TypeEfficacy } from './TypeEfficacy';
export declare class Type {
    /**
     * Type name
     */
    name: string;
    /**
     * Japanese logical name
     */
    logicalName: string;
    /**
     * type efficacies by attacker
     */
    efficaciesByAttacker: TypeEfficacy[];
    /**
     * type efficacies by attackee
     */
    efficaciesByAttackee: TypeEfficacy[];
    /**
     * constructor
     */
    constructor(name: string, logicalName: string, efficaciesByAttacker?: TypeEfficacy[], efficaciesByAttackee?: TypeEfficacy[]);
    /**
     * getEfficacyTo
     */
    getEfficacyTo(attackee: Type): number;
    /**
     * getEfficacyBy
     */
    getEfficacyBy(attacker: Type): number;
}
