import {useRef} from 'react';

/**
 * Replacement for useCallback use case with empty array,
 * it memoize only the first function passed.
 * https://github.com/facebook/react/issues/15278.
 *
 * @param callback - The function to memoize.
 * @returns - The memoized function.
 */
export function useFunction<T extends (...args: any[]) => any>(callback: T): T {
  return useRef<T>(callback).current;
}
