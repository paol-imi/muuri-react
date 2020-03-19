import { useRef } from "react";

/**
 * Replacement for useMemo use case with empty array.
 * https://github.com/facebook/react/issues/15278.
 * @param {function} getValue
 */
export function useMemoized(getValue) {
  const valueRef = useRef();

  if (!valueRef.current) {
    valueRef.current = getValue();
  }

  return valueRef.current;
}
