/**
 * Set the drag container-
 * @param {object} options
 */
export function setDragContainer(options) {
  let dragContainer = options.dragContainer;

  Object.defineProperty(options, "dragContainer", {
    get() {
      return dragContainer.current;
    },
    set(value) {
      if (!value || value instanceof Element) {
        dragContainer = { current: value };
      } else {
        dragContainer = value;
      }
    }
  });

  options.dragContainer = dragContainer;
}
