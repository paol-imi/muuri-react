import type {DecoratedGrid, ReactGridProps} from '../../interfaces';

/**
 * Filter the items with the given predicate.
 *
 * @param grid - The grid instance.
 * @param predicate - The filter predicate.
 */
export function filterItems(
  grid: DecoratedGrid,
  predicate: Exclude<ReactGridProps['filter'], undefined>
): void {
  grid.filter((item) => predicate(item.getData(), item), {layout: false});
}
