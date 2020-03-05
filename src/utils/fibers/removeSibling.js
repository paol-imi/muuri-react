/**
 * Remove the first sibling from a fiber node
 * and return it.
 * @param {React.Fiber} child
 * @return {React.fiber}
 */
export function removeSibling(child) {
  const removed = child.sibling;
  child.sibling = child.sibling.sibling;
  // Remove the sibling reference.
  removed.sibling = null;
  return removed;
}
