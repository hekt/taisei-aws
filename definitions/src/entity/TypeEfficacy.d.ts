import 'reflect-metadata';
import { Type } from './Type';
export declare class TypeEfficacy {
    /**
     * Primary key for RDBMS
     */
    id: number;
    /**
     * Efficacy rate
     */
    rate: number;
    /**
     * Attacker type
     */
    attacker: Type;
    /**
     * Attackee type
     */
    attackee: Type;
    /**
     * constructor
     */
    constructor(attacker: Type, attackee: Type, rate: number);
}
