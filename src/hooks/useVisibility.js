import { useItemContext, useGridContext } from "../contexts";
import { useFunction } from "../utils/hooks";

export function useVisibility() {
  const { layoutController } = useGridContext();
  const { eventController, itemRefController } = useItemContext();

  // Set visibility.
  const setVisibility = useFunction((visible, options) => {
    if (!itemRefController.hasItem()) return;
    if (!!visible === eventController.getPayload("show")) return;

    // Default options.
    options = options || useVisibility.defaultOptions;

    // Set the visibility.
    layoutController.setItemVisibility(
      itemRefController.getItem(),
      visible,
      options.instant
    );
  });

  return setVisibility;
}

useVisibility.defaultOptions = { instant: false };
