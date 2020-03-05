/**
 * Remove the first child of a fiber node
 * and return it.
 * @param {React.Fiber} owner
 * @return {React.Fiber}
 */
export function removeFirstChild(owner) {
  const removed = owner.child;
  owner.child = owner.child.sibling;
  // Remove the sibling reference.
  removed.sibling = null;
  return removed;
}
