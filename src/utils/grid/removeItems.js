/**
 * Remove the items.
 * @param {Muuri} muuri
 * @param {Elements[]} DOMItemsToRemove
 */
export function removeItems(muuri, itemsToRemove) {
  muuri.remove(itemsToRemove, { layout: false, removeElements: false });
}
