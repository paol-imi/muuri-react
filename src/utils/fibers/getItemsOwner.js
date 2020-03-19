/**
 * Get the fiber parent of the items given the gridComponent.
 * @param {Element} grid
 * @return {React.Fiber}
 */
export function getItemsOwner(grid) {
  const key = Object.keys(grid).find(key =>
    key.startsWith("__reactInternalInstance$")
  );

  return grid[key];
}
