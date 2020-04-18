import type { DecoratedGrid } from "./interfaces";
/**
 * Map that links the Muuri instances to
 * their id and group ids.
 */
export declare class MuuriMap {
    /** Map of <id, Muuri instance>. */
    _idMap: Map<string, DecoratedGrid>;
    /** Map of <id, Muuri instances>. */
    _groupMap: Map<string, DecoratedGrid[]>;
    /**
     * Get the grid instance with the chosen id.
     *
     * @param id - The id.
     * @returns - The grid instance.
     */
    get(id: string): DecoratedGrid | null;
    /**
     * Get all the grid instances in the group of the given id.
     * The reference of the group array never changes.
     *
     * @param groupId - The group id.
     * @returns - The array of grid instances.
     */
    getGroup(groupId: string): DecoratedGrid[];
    /**
     * Get all the grid instances in the map.
     *
     * @returns - The grid instances.
     */
    getAll(): DecoratedGrid[];
    /**
     * Set the grid instance with the given id.
     *
     * @param grid - The grid instance.
     * @param id - The id of the instance.
     * @returns - The muuriMap.
     */
    set(grid: DecoratedGrid, id: string): this;
    /**
     * Set the grid instance in the group of the given id.
     *
     * @param grid - The grid instance.
     * @param groupId - The id of the group.
     * @returns - The muuriMap.
     */
    setGroup(grid: DecoratedGrid, groupId: string): this;
    /**
     * Delete the grid instance with the given id.
     *
     * @param id - The id of the instance.
     * @returns - The muuriMap.
     */
    delete(id: string): this;
    /**
     * Delete the instance from the group with the given id.
     *
     * @param grid - The grid instance.
     * @param groupIds - The group ids of the instance.
     */
    deleteGroup(grid: DecoratedGrid, groupId: string): this;
    /**
     * Clear the maps.
     */
    clear(): this;
}
export declare const muuriMap: MuuriMap;
