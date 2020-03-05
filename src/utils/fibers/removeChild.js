import { removeFirstChild } from "./removeFirstChild";
import { removeSibling } from "./removeSibling";
import { getItem } from "./getItem";

/**
 * Remove a child with the given key from the owner
 * and return it.
 * @param {React.Fiber} itemsOwner
 * @param {string} key
 * @return {React.Fiber}
 */
export function removeChild(itemsOwner, key) {
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

  return removedChild;
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
