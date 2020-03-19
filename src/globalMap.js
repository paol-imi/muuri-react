class GlobalMap {
  constructor() {
    this._idMap = new Map();
    this._groupMap = new Map();
  }

  // Set the grid.
  set(muuri, id, groupIds) {
    if (id) {
      this._idMap.set(id, muuri);
    }
    if (groupIds) {
      for (const groupId of groupIds) {
        if (this._groupMap.has(groupId)) {
          this._groupMap.get(groupId).push(muuri);
        } else {
          this._groupMap.set(groupId, [muuri]);
        }
      }
    }
  }

  // Delete the grid.
  delete(muuri, id, groupIds) {
    if (id) {
      this._idMap.delete(id);
    }
    if (groupIds) {
      for (let groupId of groupIds) {
        const grids = this._groupMap.get(groupId);
        const index = grids.indexOf(muuri);
        if (index > -1) grids.splice(index, 1);
      }
    }
  }

  // Get all the grids with the chosen groupId.
  getFromGroupId(groupId) {
    if (!this._groupMap.has(groupId)) {
      this._groupMap.set(groupId, []);
    }
    return this._groupMap.get(groupId);
  }

  // Get the grid with the chosen id.
  getFromId(id) {
    this._idMap.get(id);
  }
}

export const globalMap = new GlobalMap();
