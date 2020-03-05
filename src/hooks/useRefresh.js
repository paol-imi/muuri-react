import { useCallback, useEffect } from "react";
import { useGridContext, useItemContext } from "../contexts";

export function useRefresh(deps = []) {
  // contexts.
  const { layoutController } = useGridContext();
  const { itemRefController } = useItemContext();

  // Because of memoization, The identity of the function is guaranteed
  // to be stable so it will be safe to omit it as a dependency.
  const refresh = useCallback(() => {
    if (!itemRefController.hasItem()) return;
    // Get the item.
    const item = itemRefController.getItem();
    // If the component is rendering within the MuuriComponent.
    layoutController.refreshItem(item);
  }, []); // eslint-disable-line

  useEffect(() => {
    refresh();
  }, deps); // eslint-disable-line

  return refresh;
}
