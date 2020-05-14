import type {DecoratedGrid, DecoratedItem} from '../../interfaces';

/**
 * Remove the given items.
 *
 * @param grid - The grid instance.
 * @param itemsToRemove - The items to remove.
 */
export function removeItems(
  grid: DecoratedGrid,
  itemsToRemove: DecoratedItem[]
): void {
  grid.remove(itemsToRemove, {layout: false, removeElements: false});
}
