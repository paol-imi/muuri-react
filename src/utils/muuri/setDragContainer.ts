import type {GridProps} from '../../interfaces';

/**
 * Wrap the 'dragContainer' option.
 * Allow it to be a ref.
 *
 * @param options - The grid options.
 */
export function setDragContainer(options: GridProps): void {
  const {dragContainer} = options;
  // The drag container ref.
  let ref = {current: null};

  // Define the property.
  Object.defineProperty(options, 'dragContainer', {
    get() {
      return ref.current;
    },
    set(value) {
      if (!value || value instanceof Element) {
        ref.current = value;
      } else {
        ref = value;
      }
    },
  });

  // Set the drag container.
  options.dragContainer = dragContainer;
}
