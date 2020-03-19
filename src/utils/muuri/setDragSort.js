/**
 * Return the 'dragSort' option given the groupId of the grids.
 * @param {object} options
 * @param {GridsMap} gridsMap
 * @return {function}
 */
export function setDragSort(options, gridsMap) {
  const { dragSort } = options;
  // Parse this options only if it is an object.
  if (typeof dragSort !== "object") return dragSort;
  // Check the options.
  if (typeof dragSort.groupId !== "string") {
    throw new TypeError("You must provide a string as groupId.");
  }
  // The group id.
  const grids = gridsMap.getFromGroupId(dragSort.groupId);
  // The method.
  options.dragSort = () => grids;
}
