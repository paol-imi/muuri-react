import { useEffect } from "react";
import { useItemContext } from "../contexts";
import { useRerender } from "../utils/hooks";

export function useDrag() {
  const { eventController } = useItemContext();
  const reRender = useRerender();

  useEffect(() => {
    eventController.enableEvent("drag", reRender);
  }, []); // eslint-disable-line

  return eventController.getPayload("drag") || false;
}
