import type {DecoratedGrid} from '../../interfaces';

/** Class names. */
const itemClassNames = [
  'itemClass',
  'itemVisibleClass',
  'itemHiddenClass',
  'itemPositioningClass',
  'itemDraggingClass',
  'itemReleasingClass',
  'itemPlaceholderClass',
] as const;

/**
 * Returns the items classes.
 *
 * @param grid - The Muuri instance.
 * @returns - The classes.
 */
export function getItemClasses(grid: DecoratedGrid): string[] {
  // @ts-ignore
  return itemClassNames.map((className) => grid._settings[className]);
}
