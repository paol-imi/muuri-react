import type { DecoratedGrid, ReactGridProps } from "../../interfaces";
/**
 * Sort the items.
 *
 * @param grid - The grid instance.
 * @param predicate - The sort predicate.
 * @param sortOptions - The sort options.
 */
export declare function sortItems(grid: DecoratedGrid, predicate: Exclude<ReactGridProps["sort"], undefined>, sortOptions: ReactGridProps["sortOptions"]): void;
