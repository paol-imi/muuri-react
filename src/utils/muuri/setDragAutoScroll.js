/**
 * Get the dragAutoScroll option.
 * @param {object} dragAutoScroll
 */
export function setDragAutoScroll(options) {
  const { dragAutoScroll } = options;

  if (!dragAutoScroll || !Array.isArray(dragAutoScroll.targets)) return;

  for (let target of dragAutoScroll.targets) {
    const element = target.element;

    Object.defineProperty(target, "element", {
      get() {
        return target._ref.current;
      },
      set(element) {
        if (typeof element === "string") {
          target._ref = { current: document.querySelector(element) };
        } else if (Element && element instanceof Element) {
          target._ref = { current: element };
        } else if (window && element instanceof window.constructor) {
          target._ref = { current: element };
        } else {
          target._ref = element;
        }
      }
    });

    target.element = element;
  }
}
