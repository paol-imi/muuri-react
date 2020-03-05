/**
 * Sort the items.
 * @param {Muuri} muuri
 * @param {(string|function)} predicate
 * @param {object} sortOptions
 */
export function sortItems(muuri, predicate, sortOptions) {
  if (typeof predicate === "function") {
    muuri.sort((itemA, itemB) => {
      return predicate(itemA.getData(), itemB.getData(), itemA, itemB);
    }, sortOptions);
  } else {
    muuri.sort(predicate, sortOptions);
  }
}
