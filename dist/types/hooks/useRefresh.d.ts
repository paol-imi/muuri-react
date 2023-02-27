export type RefreshMethod = () => void;
/**
 * The useRefresh hook allow to notify the MuuriComponent that the
 * item dimensions are changed, so that it can update the layout.
 *
 * @param deps - The dependencies.
 * @returns - The refresh method.
 */
export declare function useRefresh(deps?: any[]): RefreshMethod;
