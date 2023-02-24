import type { DecoratedGrid } from '../interfaces';
export type GridData = {
    id?: string;
    groupIds?: string[];
    grid: DecoratedGrid;
};
/**
 * The useGrid hook return the data of the MuuriComponent parent of the
 * item (in which the hook has been called).
 *
 * @returns - The data of the MuuriComponent.
 */
export declare function useGrid(): GridData;
