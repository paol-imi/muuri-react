import Muuri from "muuri";
import { isDecorated } from "../decorators";

/**
 * Wrap the dragStartPredicate option.
 * @param {(object|function)} dragStartPredicate
 */
export function setDragStartPredicate(options) {
  const { dragStartPredicate: dsp } = options;

  const defaultStartPredicate =
    typeof dsp !== "function"
      ? (item, e) => Muuri.ItemDrag.defaultStartPredicate(item, e, dsp)
      : dsp;

  options.dragStartPredicate = (item, e) => {
    if (!item.getGrid()._component.dragEnabled) return false;
    if (isDecorated(item) && typeof item._component.draggable === "boolean")
      return item._component.draggable;

    return defaultStartPredicate(item, e);
  };
}
