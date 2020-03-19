import { useRef } from "react";

/**
 * Replacement for useCallback use case with empty array.
 * https://github.com/facebook/react/issues/15278.
 * @param {function} getValue
 */
export function useFunction(initValue) {
  return useRef(initValue).current;
}
