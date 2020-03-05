import { useRef } from "react";

/**
 * The return value change reference each time the condition is true.
 * @param {boolea} condition
 * @return {object}
 */
export function useDependency(condition) {
  const ref = useRef();

  if (condition) ref.current = Object.create(null);
  return ref.current;
}
