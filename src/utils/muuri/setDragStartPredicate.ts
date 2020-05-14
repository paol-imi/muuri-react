import Muuri from 'muuri';
import {getDecoration, isDecorated} from '../decorators';
import type {GridProps, DecoratedDragStartPredicate} from '../../interfaces';

/**
 * Wrap the 'dragStartPredicate' option.
 * To allow the drag:
 * - The global drag must be enabled.
 * - The item must be draggable.
 *
 * @param options - The grid options.
 */
export function setDragStartPredicate(options: GridProps): void {
  const {dragStartPredicate} = options;

  // Default predicate.
  const defaultStartPredicate = getDefaultStartPredicate(dragStartPredicate);

  // Wrap the method.
  options.dragStartPredicate = (item, event) => {
    if (!getDecoration(item.getGrid()).dragEnabled) return false;
    if (isDecorated(item) && getDecoration(item).draggable === false)
      return false;

    return defaultStartPredicate(item, event);
  };
}

/**
 * Given the dragStartPredicate option return the default method.
 *
 * @param dragStartPredicate - The dragStartPredicate option.
 * @returns - The defaultStartPredicate method.
 */
function getDefaultStartPredicate(
  dragStartPredicate: GridProps['dragStartPredicate']
): DecoratedDragStartPredicate {
  return typeof dragStartPredicate === 'function'
    ? dragStartPredicate
    : (item, event) => {
        return Muuri.ItemDrag.defaultStartPredicate(
          item,
          event,
          dragStartPredicate
        );
      };
}
