import type { DecoratedGrid, ReactGridProps } from '../../interfaces';
/**
 * Add the given items in the given positions.
 *
 * @param grid - The grid instance.
 * @param addedDOMItems - The added DOM items.
 * @param indicesToAdd - the positions in which to add the items.
 * @param addOptions - The add options.
 * @param filter - The filter.
 */
export declare function addItems(grid: DecoratedGrid, addedDOMItems: HTMLElement[], indicesToAdd: number[], addOptions: ReactGridProps['addOptions'], filter: ReactGridProps['filter']): void;
