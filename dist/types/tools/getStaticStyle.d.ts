import type { DecoratedGrid } from "../interfaces";
import type { ResponsiveStyleOptions } from "./getResponsiveStyle";
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
export declare function getStaticStyle(options: StaticStyleOptions): {
    width: string;
    height: string;
    paddingTop: string;
    margin: string;
};
