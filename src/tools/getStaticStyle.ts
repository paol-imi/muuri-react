import {invariant} from '../invariant';
import {getResponsiveStyle} from './getResponsiveStyle';
import type {DecoratedGrid} from '../interfaces';
import type {ResponsiveStyleOptions} from './getResponsiveStyle';

/** Static style options. */
export interface StaticStyleOptions extends ResponsiveStyleOptions {
  /** Container width, can be a number or a string (e.g. "100px"). */
  grid: DecoratedGrid;
}

/**
 * Get the static style.
 *
 * @param options - The options.
 * @returns - The style.
 */
export function getStaticStyle(options: StaticStyleOptions) {
  const style = getResponsiveStyle(options);

  // Check the options.
  invariant(
    'grid' in options,
    'You mast pass the grid instance to get the static style.'
  );

  // The sizer element.
  const sizerElement = options.grid.getSizerElement();

  // Set the style in the sizer.
  Object.assign(sizerElement.style, style);

  // Get the style from the sizer.
  const {width, height, paddingTop, margin} = window.getComputedStyle(
    sizerElement
  );

  return {width, height, paddingTop, margin};
}
