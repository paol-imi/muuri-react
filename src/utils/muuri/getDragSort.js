/**
 * Return the 'dragSort' option given the groupId of the grids.
 * @param {object} options
 * @param {GridsMap} gridsMap
 * @return {function}
 */
export function getDragSort(options, gridsMap) {
  // Parse this options only if it is an object.
  if (typeof options !== "object") return options;
  // The group id.
  const grids = gridsMap.getFromGroupId(options.groupId);
  // The method.
  return () => grids;
}
