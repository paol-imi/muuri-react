/**
 * Get all the DOMItems.
 * @param {Element} gridElem - The grid DOM element.
 * @return {Element[]} - The DOMItems.
 */
export function getDOMItems(gridElem, addedIndeces, itemsToRemove) {
  const allDOMItems = Array.from(gridElem.children);

  return {
    DOMItems: allDOMItems.slice(0, allDOMItems.length - itemsToRemove),
    DOMItemsToRemove: allDOMItems.slice(
      allDOMItems.length - itemsToRemove,
      allDOMItems.length
    ),
    addedDOMItems: addedIndeces.map(index => allDOMItems[index])
  };
}
