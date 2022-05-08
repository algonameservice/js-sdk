import { InvalidNameError } from "./errors.js";
export declare function isValidAddress(address: string): boolean;
export declare function normalizeName(name: string): string | InvalidNameError;
