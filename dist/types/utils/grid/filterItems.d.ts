import type { DecoratedGrid, ReactGridProps } from '../../interfaces';
/**
 * Filter the items with the given predicate.
 *
 * @param grid - The grid instance.
 * @param predicate - The filter predicate.
 */
export declare function filterItems(grid: DecoratedGrid, predicate: Exclude<ReactGridProps['filter'], undefined>): void;
