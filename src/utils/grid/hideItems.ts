import type {DecoratedGrid, DecoratedItem} from '../../interfaces';

/**
 * Hide the given items.
 *
 * @param grid - The grid instance.
 * @param items - The items to hide.
 */
export function hideItems(grid: DecoratedGrid, items: DecoratedItem[]): void {
  grid.hide(items, {layout: false});
}
