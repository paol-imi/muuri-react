import type {DecoratedGrid, ReactGridProps} from '../../interfaces';

/**
 * Add the given items in the given positions.
 *
 * @param grid - The grid instance.
 * @param addedDOMItems - The added DOM items.
 * @param indicesToAdd - the positions in which to add the items.
 * @param addOptions - The add options.
 * @param filter - The filter.
 */
export function addItems(
  grid: DecoratedGrid,
  addedDOMItems: HTMLElement[],
  indicesToAdd: number[],
  addOptions: ReactGridProps['addOptions'],
  filter: ReactGridProps['filter']
): void {
  for (let i = 0; i < addedDOMItems.length; i++) {
    // Add the items.
    grid.add(addedDOMItems[i], {index: indicesToAdd[i], layout: false});
  }

  // Show the added items (usefull just if the items are
  // hidden by default and the filter is not setted).
  if (!filter && addOptions?.show) {
    grid.show(grid.getItems(indicesToAdd), {layout: false});
  }
}
