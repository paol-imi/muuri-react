import { useItemContext } from "../contexts";
import { useFunction } from "../utils/hooks";

export const useDraggable = () => {
  const { itemRefController } = useItemContext();

  const setDraggable = useFunction(draggable => {
    // If the string default is passed le the MuuriComponent handle the drag,
    // Otherwise set if the item can be dragged.
    draggable = draggable === "default" ? null : !!draggable;
    itemRefController.set("draggable", draggable);
  });

  return setDraggable;
};
