import { useCallback } from "react";
import { useItemContext } from "../contexts";

export function useData(initialData, options) {
  const { itemRefController } = useItemContext();

  // Because of memoization, The identity of the function is guaranteed
  // to be stable so it will be safe to omit them as a dependency.
  const setData = useCallback((data, options) => {
    if (typeof data !== "object") {
      throw new TypeError("The data must be an object, founded: ", typeof data);
    }
    // Default options.
    options = options || useData.defaultOptions;
    // Set the data.
    if (options.merge) {
      // Merge.
      const currentData = itemRefController.get("data") || {};
      itemRefController.set("data", Object.assign(currentData, data));
    } else {
      // Set.
      itemRefController.set("data", data);
    }
  }, []); // eslint-disable-line

  // Set the inital data.
  if (typeof initialData === "object") {
    setData(initialData, options);
  }

  return setData;
}

// Default options.
useData.defaultOptions = { merge: false };
