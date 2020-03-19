import { useEffect } from "react";
import { useGridContext, useItemContext } from "../contexts";
import { useRerender } from "../utils/hooks";

export function useGrid() {
  const { muuri: fallbackMuuri } = useGridContext();
  const { eventController } = useItemContext();
  const muuri = eventController.getPayload("send") || fallbackMuuri;
  const reRender = useRerender();

  useEffect(() => {
    eventController.enableEvent("send", reRender);
  }, []); // eslint-disable-line

  return {
    id: muuri._component.id,
    groupIds: muuri._component.groupIds,
    muuri
  };
}
