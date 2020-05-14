import type key from '../utils/decorators/decorationKey';

/** Maybe decorated interface. */
export interface MaybeDecorated {
  [key]?: object | null;
}

/** Decorated interface. */
export interface Decorated extends MaybeDecorated {
  [key]: object;
}
