import {invariant} from '../invariant';

/** Responsive style options. */
export interface ResponsiveStyleOptions {
  /** Columns value from 0 to 1. */
  columns: number;
  /** Margin. */
  margin?: string | number;
  /** Width / height ratio. */
  ratio?: number;
  /** Height. */
  height?: string | number;
}

/**
 * Get the responsive style.
 *
 * @param options - The options.
 * @returns - The style.
 */
export function getResponsiveStyle(options: ResponsiveStyleOptions) {
  // Check options.
  invariant(typeof options === 'object', 'You must define options');

  // Check columns.
  invariant(
    typeof options.columns === 'number' &&
      options.columns > 0 &&
      options.columns <= 1,
    'options.columns must be a number between 0 (excluded) and 1 (included)'
  );

  // Check height and ratio.
  invariant(
    typeof options.ratio === 'number' ||
      typeof options.height === 'number' ||
      typeof options.height === 'string',
    'You must provide at least one option between height and ratio'
  );

  // Check that the height and the ratio options are not setted togheter.
  invariant(
    typeof options.ratio !== 'number' ||
      (typeof options.height !== 'number' &&
        typeof options.height !== 'string'),
    'You cannot provide both the height and the ratio options'
  );

  // The margin values.
  const {margin, mStatic, mDynamic} = getResponsiveMargin(
    options.margin || '0px'
  );
  // The item width.
  const {needCalc, width} = getResponsiveWidth(
    options.columns,
    mStatic,
    mDynamic
  );

  // If ratio is used set The paddingTop
  // instad of the heght, the child element must
  // have "display: absolute".
  return options.ratio
    ? {
        width: needCalc ? `calc(${width})` : width,
        paddingTop: getResponsivePaddingTop(width, options.ratio, needCalc),
        height: `0px`,
        borderWidth: '0px',
        margin,
      }
    : {
        width: needCalc ? `calc(${width})` : width,
        paddingTop: `0px`,
        // @ts-ignore
        height: getFixedHeight(options.height),
        borderWidth: '0px',
        margin,
      };
}

/**
 * Get the responsive width.
 *
 * @param columns - The percentage.
 * @param mStatic - The static margin.
 * @param mDynamic - The dynamic margin.
 * @returns - The width.
 */
function getResponsiveWidth(
  columns: number,
  mStatic: number,
  mDynamic: number
) {
  const needCalc = mStatic !== 0;
  const rawWidth = columns * 100 - mDynamic;
  const width = needCalc ? `${rawWidth}% - ${mStatic}px` : `${rawWidth}%`;

  return {needCalc, width};
}

/**
 * Get the responsive paddingTop.
 *
 * @param width - The width.
 * @param ratio - The width/height ratio.
 * @param needCalc - If the width need to be surrounded by calc().
 * @returns - The paddingTop.
 */
function getResponsivePaddingTop(
  width: string,
  ratio: number,
  needCalc: boolean
): string {
  return needCalc
    ? `calc((${width}) / ${ratio})`
    : `${parseFloat(width) / ratio}%`;
}

/**
 * Get the fixed height.
 *
 * @param height - The mixed height.
 * @returns - The height string.
 */
function getFixedHeight(height: string | number): string {
  return typeof height === 'number' ? `${height}px` : height;
}

/**
 * The responsive margin.
 *
 * @param margin - The margin.
 * @returns - The responsive margin.
 */
function getResponsiveMargin(margin: string | number) {
  if (typeof margin === 'number') margin = `${margin}px`;
  const margins = margin.trim().split(' ');

  // Margin default values.
  let leftMargin = '0px';
  let rightMargin = '0px';
  let mDynamic = 0;
  let mStatic = 0;

  // Get the values from the input.
  if (margins.length === 1) {
    leftMargin = rightMargin = margins[0];
  } else if (margins.length === 2) {
    leftMargin = rightMargin = margins[1];
  } else if (margins.length === 3) {
    leftMargin = rightMargin = margins[1];
  } else if (margins.length === 4) {
    leftMargin = margins[3];
    rightMargin = margins[1];
  }

  // Set dynamic/static margins.
  if (leftMargin.indexOf('%') === -1) mStatic += parseFloat(leftMargin);
  else mDynamic += parseFloat(leftMargin);
  if (rightMargin.indexOf('%') === -1) mStatic += parseFloat(rightMargin);
  else mDynamic += parseFloat(rightMargin);

  return {
    margin,
    mStatic,
    mDynamic,
  };
}
