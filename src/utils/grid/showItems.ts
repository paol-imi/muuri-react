import type {DecoratedGrid, DecoratedItem} from '../../interfaces';

/**
 * Show the given items.
 *
 * @param grid - The grid instance.
 * @param items - The items to show.
 */
export function showItems(grid: DecoratedGrid, items: DecoratedItem[]): void {
  grid.show(items, {layout: false});
}
