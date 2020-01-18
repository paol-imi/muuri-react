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
export function adjustIndices(indicesToAdd, indicesToRemove) {
  const array = [...indicesToAdd];
  for (let i = 0; i < indicesToAdd.length; i++) {
    for (let j = 0; j < indicesToRemove.length; j++) {
      if (indicesToAdd[i] > indicesToRemove[j]) array[i]++;
    }
  }

  return array;
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
export function removeItems(muuri, DOMItemsToRemove, removeOptions) {
  if (DOMItemsToRemove.length === 0) return;

  if (removeOptions.hide) {
    muuri.hide(DOMItemsToRemove, {
      layout: false,
      onFinish: function(items) {
        muuri.remove(items, { layout: false });
        // The items to remove are pushed in the bottom.
        //
        // The muuri.remove method remove all the style.
        // The display prop is setted after the method is called.
        DOMItemsToRemove.forEach(item => (item.style.display = "none"));
      }
    });
  } else {
    muuri.remove(DOMItemsToRemove, { layout: false });
  }
}

/**
 * Add the items in the 'adjusted' position.
 * @param {Muuri} muuri - The muuri instance.
 * @param {Element[]} DOMItems - The array of elements.
 * @param {number[]} indicesToAdd - The items indexes (Based on the new children array)
 * @param {number[]} indicesToAddAdjusted - The items indexes (Counting that the old items they have not been removed yet)
 */
export function addItems(muuri, addedDOMItems, indicesToAdd, addOptions) {
  if (addedDOMItems.length === 0) return;

  for (let i = 0; i < addedDOMItems.length; i++) {
    // Add the element without calling layout
    muuri.add(addedDOMItems[i], { index: indicesToAdd[i], layout: false });
  }

  // Show the added items
  if (addOptions.show) muuri.show(indicesToAdd, { layout: false });
}

/**
 * Get the sort data.
 * @param {ItemsMap} itemsMap - The itemsMap.
 * @param {object} props - The props.
 * @return {object} The sortData.
 */
export function getSortData(props) {
  if (!Array.isArray(props) || props.length === 0) return {};

  return props.reduce((sortData, prop) => {
    // prop = 'propName'
    sortData[prop] = function(item) {
      if (item.getProps) return item.getProps()[prop];
    };

    return sortData;
  }, {});
}

/**
 * Bind the props getter to all items.
 * @param {Item[]} items
 */
export function decorateItems(items) {
  for (let i = 0; i < items.length; i++) {
    items[i]._component = {};
    items[i].getProps = function() {
      return this._component.props || {};
    };
    items[i].getData = function() {
      return this._component.data;
    };
  }
}

/**
 * Set items data.
 * @param {Items[]} items
 * @param {React.elements[]} components
 */
export function setItemsData(components, items) {
  for (let i = 0; i < components.length; i++) {
    const { key, props } = components[i];
    items[i]._component.props = props;
    items[i]._component.key = key;
  }
}
