/**
 * Return if the component has the key special prop.
 * @param {React.Component} component - The component.
 * @return {boolean} - The result.
 */
export function hasKey(component) {
  return component.key !== undefined;
}

/**
 * @typedef {Object} UpdateData - The update data.
 * @param {number[]} indicesToRemove - the indexes of the items to remove (Indexes based on the old children array).
 * @param {number[]} indicesToAdd - the indexes of the items to add (Indexes based on the new children array).
 * @param {React.Component[]} removedChildren - the indexes of the items to remove (Indexes based on the old items).
 * @param {React.Component[]} addedChildren - the indexes of the items to remove (Indexes based on the old items).
 * @param {React.Component[]} allChildren - the indexes of the items to remove (Indexes based on the old items).
 */

/**
 * Get what is changed from the last update.
 * @param {React.Component[]} newChildren - The new children.
 * @param {?React.Component[]} oldChildren - The old children.
 * @return {UpdateData} - The update data.
 */
export function getUpdates(newChildren, oldChildren = []) {
  /** @type {number[]} - The indexes of the items to remove. */
  const indicesToRemove = [];
  /** @type {number[]} - The indexes of the items to add. */
  const indicesToAdd = [];

  // All the last rendered children that are not rendered anymore
  // (Those that don't share the key with any of the new children or doesn't have a key).
  /** @type {React.Component[]} - The removed children. */
  const removedChildren = oldChildren.filter(
    (oldChild, index) =>
      (!hasKey(oldChild) ||
        newChildren.every(newChild => newChild.key !== oldChild.key)) &&
      indicesToRemove.push(index)
  );

  // The first time rendered children
  // (Those that don't share the key with any of the old children or doesn't have a key).
  /** @type {React.Component[]} - The added children. */
  const addedChildren = newChildren.filter(
    (newChild, index) =>
      (!hasKey(newChild) ||
        oldChildren.every(oldChild => oldChild.key !== newChild.key)) &&
      indicesToAdd.push(index)
  );

  /** @type {React.Component[]} - All the component. */
  const allChildren = newChildren.concat(removedChildren);

  return {
    indicesToRemove,
    indicesToAdd,
    removedChildren,
    addedChildren,
    allChildren
  };
}
