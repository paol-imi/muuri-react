import { useCallback } from "react";
import { useItemContext, useGridContext } from "../contexts";

export function useVisibilty() {
  const { layoutController } = useGridContext();
  const { eventController, itemRefController } = useItemContext();

  // Set visibility.
  const setVisibility = useCallback((visible, options) => {
    if (!itemRefController.hasItem()) return;
    if (!!visible === eventController.getPayload("show")) return;

    // Default options.
    options = options || useVisibilty.defaultOptions;

    // Set the visibility.
    layoutController.setItemVisibility(
      itemRefController.getItem(),
      visible,
      options.instant
    );
  }, []); // eslint-disable-line

  return setVisibility;
}

useVisibilty.defaultOptions = { instant: false };
