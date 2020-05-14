import {invariant} from '../../invariant';
import type {
  GridProps,
  DragAutoScrollTarget,
  DragAutoScrollTargetElement,
} from '../../interfaces';

/**
 * Wrap the 'dragAutoScroll' option.
 * Allow the target element to be a ref.
 *
 * @param options - The grid options.
 */
export function setDragAutoScroll(options: GridProps): void {
  const {dragAutoScroll} = options;

  // Wrap the options only if it is setted.
  if (!dragAutoScroll || !Array.isArray(dragAutoScroll.targets)) return;

  dragAutoScroll.targets.forEach((target) => {
    // Check if it is an object to wrap.
    if (isTargetElement(target)) return;

    invariant(
      'element' in target,
      'You must provide an element in each scroll target'
    );

    // Scroll target element.
    const element = target.element;
    // The element ref.
    let ref: {current: DragAutoScrollTargetElement | null} = {
      current: null,
    };

    // Define the element property.
    Object.defineProperty(target, 'element', {
      get() {
        return ref.current;
      },
      set(element) {
        if (isTargetElement(element)) {
          ref.current = element;
        } else {
          ref = element;
        }
      },
    });

    // Set the element.
    target.element = element;
  });
}

/**
 * Returns if the target is a valid element.
 *
 * @param element - The target.
 * @returns - If the target is a valid element.
 */
export function isTargetElement(target: DragAutoScrollTarget): boolean {
  return (
    // A DOM element.
    target instanceof HTMLElement ||
    // The window.
    target instanceof window.constructor
  );
}
