/**
 * Filter the items.
 * @param {Muuri} muuri
 * @param {any} predicate
 */
export function filterItems(muuri, predicate) {
  muuri.filter(
    item => {
      return predicate(item.getData(), item);
    },
    { layout: false }
  );
}
