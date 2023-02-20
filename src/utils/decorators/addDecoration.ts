import key from './decorationKey';
import {isDecorated} from './isDecorated';
import type {MaybeDecorated} from '../../interfaces';

/**
 * Add a decoration to the instance.
 *
 * @param instance - The instance to decorate.
 * @param decoration - The decoration.
 */
export function addDecoration<T extends MaybeDecorated>(
  instance: T,
  decoration: Partial<T[typeof key]>
): void {
  if (isDecorated(instance)) {
    // @ts-ignore
    Object.assign(instance[key], decoration);
  } else {
    instance[key] = {...decoration};
  }
}
