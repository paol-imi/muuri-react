import { useState, useCallback } from "react";

/**
 * Rerender the component each time the returned
 * method is called.
 * @return {function}
 */
export function useRerender() {
  const setState = useState()[1];
  return useCallback(() => {
    setState(Object.create(null));
  }, []); // eslint-disable-line
}
