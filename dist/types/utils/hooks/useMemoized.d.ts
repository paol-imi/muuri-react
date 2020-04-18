/**
 * Replacement for useMemo use case with empty array,
 * it memoize only the first computed value.
 * https://github.com/facebook/react/issues/15278.
 *
 * @param factory - The factory method.
 * @returns - The memoized value.
 */
export declare function useMemoized<T>(factory: () => T): T;
