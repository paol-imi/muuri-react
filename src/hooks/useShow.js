import { useEffect } from "react";
import { useItemContext } from "../contexts";
import { useRerender } from "../utils/hooks";

export function useShow() {
  const { eventController } = useItemContext();
  const reRender = useRerender();

  useEffect(() => {
    eventController.enableEvent("show", reRender);
  }, []); // eslint-disable-line

  return eventController.getPayload("show");
}
