/**
 * Remove the items.
 * @param {Muuri} muuri
 * @param {Elements[]} DOMItemsToRemove
 */
export function removeItems(muuri, DOMItemsToRemove) {
  muuri.remove(DOMItemsToRemove, { layout: false, removeElements: false });
}
