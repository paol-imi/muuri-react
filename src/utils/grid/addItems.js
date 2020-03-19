/**
 * Add the items.
 * @param {Muuri} muuri
 * @param {Element[]} addedDOMItems
 * @param {number[]} indicesToAdd
 * @param {AddOptions} addOptions
 * @param {boolean} addOptions.show
 */
export function addItems(
  muuri,
  addedDOMItems,
  indicesToAdd,
  addOptions,
  filter
) {
  for (let i = 0; i < addedDOMItems.length; i++) {
    // Add the items.
    muuri.add(addedDOMItems[i], { index: indicesToAdd[i], layout: false });
  }

  // Show the added items (usefull just if the items are
  // hidden by default and the filter is not setted).
  if (!filter && addOptions.show) muuri.show(indicesToAdd, { layout: false });
}
