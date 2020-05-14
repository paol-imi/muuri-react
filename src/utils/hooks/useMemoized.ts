import {useRef} from 'react';

/**
 * Replacement for useMemo use case with empty array,
 * it memoize only the first computed value.
 * https://github.com/facebook/react/issues/15278.
 *
 * @param factory - The factory method.
 * @returns - The memoized value.
 */
export function useMemoized<T>(factory: () => T): T {
  const valueRef = useRef<T>();

  if (!valueRef.current) {
    valueRef.current = factory();
  }

  return valueRef.current;
}
