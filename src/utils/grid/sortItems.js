/**
 * Sort the items.
 * @param {Muuri} muuri
 * @param {(string|function|string[])} predicate
 * @param {object} sortOptions
 */
export function sortItems(muuri, predicate, sortOptions = {}) {
  sortOptions = { ...sortOptions, layout: false };

  if (typeof predicate === "function") {
    handleMethod(muuri, predicate, sortOptions);
  }

  if (typeof predicate === "string") {
    handleString(muuri, predicate, sortOptions);
  }

  if (Array.isArray(predicate)) {
    handleArray(muuri, predicate, sortOptions);
  }
}

/**
 * Sort the items given a predicate function.
 * @param {Muuri} muuri
 * @param {(string|function|string[])} predicate
 * @param {object} sortOptions
 */
function handleMethod(muuri, predicate, sortOptions) {
  muuri.sort(
    (itemA, itemB) => predicate(itemA.getData(), itemB.getData(), itemA, itemB),
    sortOptions
  );
}

/**
 * Sort the items given a predicate string.
 * @param {Muuri} muuri
 * @param {(string|function|string[])} predicate
 * @param {object} sortOptions
 */
function handleString(muuri, predicate, sortOptions) {
  muuri.sort(predicate, sortOptions);
}

/**
 * Sort the items given a string of string keys as predicate.
 * @param {Muuri} muuri
 * @param {(string|function|string[])} predicate
 * @param {object} sortOptions
 */
function handleArray(muuri, predicate, sortOptions) {
  const items = muuri.getItems();
  const orderedItems = [];
  const otherItems = [];

  for (const item of items) {
    const index = predicate.findIndex(key => key === item._component.key);

    if (index > -1) {
      orderedItems[index] = item;
    } else {
      otherItems.push(item);
    }
  }

  muuri.sort(
    Array.prototype.concat(orderedItems.filter(item => !!item), otherItems),
    sortOptions
  );
}
