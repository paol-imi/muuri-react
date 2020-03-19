import { useState } from "react";
import { useFunction } from "./useFunction";

/**
 * Rerender the component each time the returned
 * method is called.
 * @return {function}
 */
export function useRerender() {
  const setState = useState()[1];
  return useFunction(() => {
    setState(Object.create(null));
  });
}
