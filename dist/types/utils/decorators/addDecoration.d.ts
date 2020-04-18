import key from "./decorationKey";
import type { MaybeDecorated } from "../../interfaces";
/**
 * Add a decoration to the instance.
 *
 * @param instance - The instance to decorate.
 * @param decoration - The decoration.
 */
export declare function addDecoration<T extends MaybeDecorated>(instance: T, decoration: Partial<T[typeof key]>): void;
