import key from './decorationKey';
import type {MaybeDecorated} from '../../interfaces';

/**
 * Return if the instance is decorated.
 *
 * @param instance - The instance.
 * @returns - If the instance is decorated.
 */
export function isDecorated(instance: MaybeDecorated): boolean {
  return !!instance[key];
}
