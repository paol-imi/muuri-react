/**
 * Return the dom elements in the chosen positions.
 * @param {React.Fiber} itemsOwner
 * @param {number[]} indices
 * @return {ELement[]}
 */
export function getStateNodes(itemsOwner, indices) {
  let stateNodes = [];
  let child = itemsOwner.child;

  for (let index of indices) {
    while (child.index !== index) child = child.sibling;
    stateNodes.push(getStateNode(child));
  }

  return stateNodes;
}

function getStateNode(child) {
  child = child.child.child;
  while (!child.stateNode) child = child.child;
  return child.stateNode;
}
