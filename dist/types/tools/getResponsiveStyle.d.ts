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
export declare function getResponsiveStyle(options: ResponsiveStyleOptions): {
    width: string;
    paddingTop: string;
    height: string;
    borderWidth: string;
    margin: string;
};
