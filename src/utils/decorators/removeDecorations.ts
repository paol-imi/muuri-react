import type {MaybeDecorated} from '../../interfaces';

/**
 * Remove the decoration from the instance.
 *
 * @param decorated - The instance.
 */
export function removeDecorations(decorated: MaybeDecorated): void {
  decorated._component = null;
}
