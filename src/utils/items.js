/**
 * If an item should be inserted in the x position
 * that position has to be calculated counting that
 * some items will be removed.
 *
 * @example
 * In the array [item1, toRemove, item2]
 * the second position is after item2.
 *
 * @param {number[]} indicesToAdd - The indexes of the items to add.
 * @param {number[]} indicesToRemove - The indexes of the items to remove.
 * @return {number[]} - The indexes adjusted.
 */
export function adjustIndex(indicesToAdd, indicesToRemove) {
  const array = [...indicesToAdd];
  for (let i = 0; i < indicesToAdd.length; i++) {
    for (let j = 0; j < indicesToRemove.length; j++) {
      if (indicesToAdd[i] > indicesToRemove[j]) array[i]++;
    }
  }

  return array;
}

/**
 * Get all the DOMItems.
 * @param {Element} gridElem - The grid DOM element.
 * @return {Element[]} - The DOMItems.
 */
export function getDOMItems(gridElem) {
  return Array.from(gridElem.children);
}

/**
 * Items can't be removed from the DOM or
 * reactDOM won't find them and it will throw an error.
 *
 * Instead items are hidden, the display style prop
 * is setted to none and then the they are removed
 * from the muuri instance (but not from the DOM).
 * @param {Muuri} muuri - The muuri instance.
 * @param {Elements[]} DOMItems - The array.
 * @param {number} itemsToRemove - The number of items to remove.
 */
export function removeItems(muuri, DOMItems, itemsToRemove) {
  if (itemsToRemove === 0) return;

  DOMItems = DOMItems.slice(-itemsToRemove);
  muuri.hide(DOMItems, {
    onFinish: function(items) {
      muuri.remove(items, { layout: false });
      // The items to remove are pushed in the bottom.
      //
      // The muuri.remove method remove all the style.
      // The display prop is setted after the method is called.
      DOMItems.forEach(item => (item.style.display = "none"));
    }
  });
}

/**
 * Return the added DOMItems.
 * @param {Element[]} DOMItem - The DOMItems.
 * @param {number[]} indicesToAdd - The indeces to add.
 * @return {Element[]} - The added DOMitems.
 */
export function getAddedDOMItems(DOMItem, indicesToAdd) {
  return indicesToAdd.map(index => DOMItem[index]);
}

/**
 * Add the items in the 'adjusted' position.
 * @param {Muuri} muuri - The muuri instance.
 * @param {Element[]} DOMItems - The array of elements.
 * @param {number[]} indicesToAdd - The items indexes (Based on the new children array)
 * @param {number[]} indicesToAddAdjusted - The items indexes (Counting that the old items they have not been removed yet)
 */
export function addItems(muuri, addedDOMItems, indicesToAdd) {
  if (addedDOMItems.length === 0) return;

  for (let i = 0; i < addedDOMItems.length; i++) {
    muuri.add(addedDOMItems[i], { index: indicesToAdd[i] });
  }
}

/**
 * Get the added items.
 * @param {Muuri} muuri - The muuri instance.
 * @param {number[]} indicesToAdd - The indeces to add.
 * @return {Items[]} - The added items.
 */
export function getAddedItems(muuri, indicesToAdd) {
  const DOMItems = getDOMItems(muuri.getElement());
  return muuri.getItems(indicesToAdd.map(index => DOMItems[index]));
}

/**
 * Get the sort data.
 * @param {ItemsMap} itemsMap - The itemsMap.
 * @param {object} props - The props.
 * @return {object} The sortData.
 */
export function getSortData(itemsMap, props) {
  if (!Array.isArray(props) || props.length === 0) return {};

  return props.reduce((sortData, prop) => {
    sortData[prop] = function(_, DOMItem) {
      const props = itemsMap.getPropsFromDOMItem(DOMItem);
      return props ? props[prop] : undefined;
    };

    return sortData;
  }, {});
}
