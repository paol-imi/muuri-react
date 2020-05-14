import type {DecoratedGrid} from '../../interfaces';

/** Class name. */
const gridClassName = 'containerClass';

/**
 * Returns the Css class of the grid element.
 *
 * @param grid - The Muuri instance.
 * @returns - The class.
 */
export function getGridClass(grid: DecoratedGrid): string {
  // @ts-ignore
  return grid._settings[gridClassName];
}
