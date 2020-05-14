import type {DecoratedGrid} from './interfaces';

/**
 * Map that links the Muuri instances to
 * their id and group ids.
 */
export class MuuriMap {
  /** Map of <id, Muuri instance>. */
  _idMap = new Map<string, DecoratedGrid>();
  /** Map of <id, Muuri instances>. */
  _groupMap = new Map<string, DecoratedGrid[]>();

  /**
   * Get the grid instance with the chosen id.
   *
   * @param id - The id.
   * @returns - The grid instance.
   */
  get(id: string): DecoratedGrid | null {
    return this._idMap.get(id) || null;
  }

  /**
   * Get all the grid instances in the group of the given id.
   * The reference of the group array never changes.
   *
   * @param groupId - The group id.
   * @returns - The array of grid instances.
   */
  getGroup(groupId: string): DecoratedGrid[] {
    const group = this._groupMap.get(groupId);

    if (!group) {
      const newGroup: DecoratedGrid[] = [];
      this._groupMap.set(groupId, newGroup);
      return newGroup;
    } else {
      return group;
    }
  }

  /**
   * Get all the grid instances in the map.
   *
   * @returns - The grid instances.
   */
  getAll(): DecoratedGrid[] {
    return Array.from(this._idMap.values());
  }

  /**
   * Set the grid instance with the given id.
   *
   * @param grid - The grid instance.
   * @param id - The id of the instance.
   * @returns - The muuriMap.
   */
  set(grid: DecoratedGrid, id: string): this {
    this._idMap.set(id, grid);
    return this;
  }

  /**
   * Set the grid instance in the group of the given id.
   *
   * @param grid - The grid instance.
   * @param groupId - The id of the group.
   * @returns - The muuriMap.
   */
  setGroup(grid: DecoratedGrid, groupId: string): this {
    const group = this._groupMap.get(groupId);

    if (group) {
      group.push(grid);
    } else {
      this._groupMap.set(groupId, [grid]);
    }

    return this;
  }

  /**
   * Delete the grid instance with the given id.
   *
   * @param id - The id of the instance.
   * @returns - The muuriMap.
   */
  delete(id: string): this {
    this._idMap.delete(id);
    return this;
  }

  /**
   * Delete the instance from the group with the given id.
   *
   * @param grid - The grid instance.
   * @param groupIds - The group ids of the instance.
   */
  deleteGroup(grid: DecoratedGrid, groupId: string): this {
    const group = this._groupMap.get(groupId);

    if (group) {
      const index = group.indexOf(grid);
      if (index > -1) group.splice(index, 1);
    }

    return this;
  }

  /**
   * Clear the maps.
   */
  clear(): this {
    this._idMap.clear();
    this._groupMap.clear();
    return this;
  }
}

export const muuriMap: MuuriMap = new MuuriMap();
