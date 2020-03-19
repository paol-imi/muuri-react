/**
 * Return the dom elements in the chosen positions.
 * @param {Muuri} muuri
 * @param {number[]} indices
 * @return {ELement[]}
 */
export function getNewChildren(muuri, indices) {
  const children = Array.from(muuri.getElement().children);
  const newChildren = [];

  for (let index of indices) {
    newChildren.push(children[index]);
  }

  return newChildren;
}
