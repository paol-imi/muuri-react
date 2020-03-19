/**
 * Return an array of the indices of the positions
 * of the added children.
 * The algorithm is optimized for cases where the order of
 * the items does not change (about 100% of cases).
 * @param {React.Component[]} newChildren
 * @param {React.Component[]} oldChildren
 * @return {number[]}
 */
export function getIndicesToAdd(newChildren, oldChildren) {
  let indicesToAdd = [],
    oIndex = 0;

  for (let nIndex = 0; nIndex < newChildren.length; nIndex++) {
    const index = findIndex(newChildren[nIndex], oldChildren, oIndex);
    if (index === -1) {
      indicesToAdd.push(nIndex);
    } else {
      oIndex = index;
    }
  }

  return indicesToAdd;
}

/**
 * Find the index of the child in the children array.
 * The research start from the given 'fromIndex'.
 * @param {React.Component} child
 * @param {React.Component[]} children
 * @param {number} fromIndex
 */
function findIndex(child, children, fromIndex) {
  fromIndex = fromIndex > children.length ? children.length : fromIndex;

  for (let index = fromIndex; index < children.length; index++) {
    if (is(child, children[index])) return index;
  }

  for (let index = 0; index < fromIndex; index++) {
    if (is(child, children[index])) return index;
  }

  return -1;
}

/**
 * Return if the components have the same key.
 * @param {React.Component} componentA
 * @param {React.Component} componentB
 */
function is(componentA, componentB) {
  return componentA.key === componentB.key;
}
