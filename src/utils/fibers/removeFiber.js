export function removeFiber(itemsOwner, key) {
  const removedChild = removeChild(itemsOwner, key);

  if (removedChild.alternate) {
    if (itemsOwner.alternate) {
      removeChild(itemsOwner.alternate, key);
    }

    //removedChild.alternate.alternate = null;
    //removedChild.alternate = null;
  }

  return removedChild;
}

/**
 * Get the fiber of the item from the fiber of the ItemComponent.
 * @param {React.fiber} itemComponent
 * @return {React.fiber}
 */
export function getItem(itemComponent) {
  /**
   * ItemComponent -> ItemProvider -> Item
   */
  return itemComponent.child.child;
}

/**
 * If the fiber has not the key.
 * @param {React.Fiber} child
 * @param {string} key
 * @return {boolean}
 */
function hasNot(child, key) {
  return getItem(child).key !== key;
}

/**
 *  Adjust the indices.
 * @param {React.Fiber} child
 */
function adjustIndices(child) {
  while (child.sibling) {
    child.sibling.index = child.index + 1;
    child = child.sibling;
  }
}

/**
 * Remove a child with the given key from the owner
 * and return it.
 * @param {React.Fiber} itemsOwner
 * @param {string} key
 * @return {React.Fiber}
 */
function removeChild(itemsOwner, key) {
  let child = itemsOwner.child,
    removedChild;

  if (hasNot(child, key)) {
    while (hasNot(child.sibling, key)) {
      child = child.sibling;
    }
    removedChild = removeSibling(child);
    adjustIndices(child);
  } else {
    removedChild = removeFirstChild(itemsOwner);
    child = child.sibling;
    if (child) adjustIndices(child);
  }

  removedChild.sibling = null;
  return removedChild;
}

/**
 * Remove the first child of a fiber node
 * and return it.
 * @param {React.Fiber} owner
 * @return {React.Fiber}
 */
export function removeFirstChild(owner) {
  const removed = owner.child;
  owner.child = owner.child.sibling;
  return removed;
}

/**
 * Remove the first sibling from a fiber node
 * and return it.
 * @param {React.Fiber} child
 * @return {React.fiber}
 */
export function removeSibling(child) {
  const removed = child.sibling;
  child.sibling = child.sibling.sibling;
  return removed;
}
