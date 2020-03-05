/**
 * Return an array of the indices of the positions
 * of the added children.
 * @param {React.Component[]} newChildren
 * @param {React.Component[]} oldChildren
 * @return {number[]}
 */
export function getIndicesToAdd(newChildren, oldChildren) {
  const indicesToAdd = [];

  newChildren.forEach((newChild, index) => {
    if (oldChildren.every(oldChild => oldChild.key !== newChild.key)) {
      indicesToAdd.push(index);
    }
  });

  return indicesToAdd;
}
