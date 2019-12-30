import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import Muuri from "muuri";

/**
 * If an item should be inserted in the x position
 * that position has to be calculated counting that
 * some items will be removed.
 *
 * @example
 * In the array [item1, toRemove, item2]
 * the second position is after item2.
 *
 * @param {number[]} itemsToAdd - The indexes of the items to add.
 * @param {number[]} itemsToRemove - The indexes of the items to remove.
 */
function adjustIndex(itemsToAdd, itemsToRemove) {
  const array = [...itemsToAdd];
  for (let i = 0; i < itemsToAdd.length; i++) {
    for (let j = 0; j < itemsToRemove.length; j++) {
      if (itemsToAdd[i] > itemsToRemove[j]) array[i]++;
    }
  }

  return array;
}

/**
 * Get all the items.
 * @param {Element} gridElem - The grid DOM element.
 * @return {Element[]} - The items.
 */
function getItems(gridElem) {
  return Array.from(gridElem.children);
}

/**
 * Return if the child has the key special prop.
 * @param {React.Component} child - The child.
 */
function hasKey(child) {
  return child.key !== undefined;
}

/**
 * @typedef {Object} UpdateData - The update data.
 * @param {number[]} itemsToRemove - the indexes of the items to remove (Indexes based on the old children array).
 * @param {number[]} itemsToAdd - the indexes of the items to add (Indexes based on the new children array).
 * @param {React.Component[]} removedChildren - the indexes of the items to remove (Indexes based on the old items).
 * @param {React.Component[]} addedChildren - the indexes of the items to remove (Indexes based on the old items).
 * @param {React.Component[]} allChildren - the indexes of the items to remove (Indexes based on the old items).
 */

/**
 * Get what is changed from the last update.
 * @param {React.Component[]} newChildren - The new children.
 * @param {?React.Component[]} oldChildren - The old children.
 * @return {UpdateData} - The update data.
 */
function getUpdates(newChildren, oldChildren = []) {
  /** @type {number[]} - The indexes of the items to remove. */
  const itemsToRemove = [];
  /** @type {number[]} - The indexes of the items to add. */
  const itemsToAdd = [];

  // All the last rendered children that are not rendered anymore
  // (Those that don't share the key with any of the new children or doesn't have a key).
  /** @type {React.Component[]} - The removed children. */
  const removedChildren = oldChildren.filter(
    (oldChild, index) =>
      (!hasKey(oldChild) ||
        newChildren.every(newChild => newChild.key !== oldChild.key)) &&
      itemsToRemove.push(index)
  );

  // The first time rendered children
  // (Those that don't share the key with any of the old children or doesn't have a key).
  /** @type {React.Component[]} - The added children. */
  const addedChildren = newChildren.filter(
    (newChild, index) =>
      (!hasKey(newChild) ||
        oldChildren.every(oldChild => oldChild.key !== newChild.key)) &&
      itemsToAdd.push(index)
  );

  /** @type {React.Component[]} - All the component. */
  const allChildren = newChildren.concat(removedChildren);

  return {
    itemsToRemove,
    itemsToAdd,
    removedChildren,
    addedChildren,
    allChildren
  };
}

/**
 * Items can't be removed from the DOM or
 * reactDOM won't find them and it will throw an error.
 *
 * Instead items are hidden, the display style prop
 * is setted to none and then the they are removed
 * from the muuri instance (but not from the DOM).
 * @param {Muuri} muuri - The muuri instance.
 * @param {Elements[]} items - The array.
 * @param {number[]} itemsToRemove - The indexes of the items to remove.
 */
function removeItems(muuri, items, itemsToRemove) {
  if (itemsToRemove.length === 0) return;

  items = items.slice(-itemsToRemove.length);
  muuri.hide(items, {
    onFinish: function() {
      muuri.remove(items, { layout: false });
      // The items to remove are pushed in the bottom.
      //
      // The muuri.remove method remove all the style.
      // The display prop is setted after the method is called.
      items.forEach(item => (item.style.display = "none"));
    }
  });
}

/**
 * Add the items in the 'adjusted' position.
 * @param {Muuri} muuri - The muuri instance.
 * @param {Element[]} items - The array of elements.
 * @param {number[]} itemsToAdd - The items indexes (Based on the new children array)
 * @param {number[]} itemsToAddAdjusted - The items indexes (Counting that the old items they have not been removed yet)
 */
function addItems(muuri, items, itemsToAdd, itemsToAddAdjusted) {
  if (itemsToAdd.length === 0) return;

  for (let i = 0; i < itemsToAdd.length; i++) {
    muuri.add(items[itemsToAdd[i]], { index: itemsToAddAdjusted[i] });
  }
}

/**
 * Wrap the children in a div.
 * ReactDom doesn't change the element on re-render so
 * the div don't need to be memoized or something.
 * @param {React.Component[]} children
 * @param {Object} gridProps
 * @param {React.Ref} ref
 */
function render(children, gridProps, ref) {
  if (typeof gridProps !== "object") gridProps = {};

  return (
    <div {...gridProps} ref={ref}>
      {children}
    </div>
  );
}

// The component
export const MuuriComponent = forwardRef(
  (
    { children, options, gridProps, onMount, onUnmount, filter, sort, filterOptions, sortOptions },
    muuriRef
  ) => {
    // Grid element ref
    const gridElemRef = useRef();
    // Store all the old data
    const manager = useMemo(
      () => ({
        oldChildren: [],
        muuri: undefined,
        addedDep: {},
        removedDep: {},
        itemsDragging: 0
      }),
      []
    );

    // Children to array
    children = React.Children.toArray(children);

    // Update data
    const { itemsToRemove, itemsToAdd, allChildren } = getUpdates(
      children,
      manager.oldChildren
    );

    // Update manager data
    manager.oldChildren = children;
    if (itemsToAdd.length) manager.addedDep = {};
    if (itemsToRemove.length) manager.removedDep = {};

    // Generate the Muuri instance on mounting
    // and destroy it on anmounting
    useEffect(() => {
      options = options || {}; // eslint-disable-line
      // Items will be added in the next hook
      options.items = [];
      // To avoid bug on re-rendering if an item is dragging
      options.dragContainer = gridElemRef.current;
      // Generate the instance
      manager.muuri = new Muuri(gridElemRef.current, options);
      // Mounting
      if (typeof onMount === "function") onMount(manager.muuri);
      // Set the ref
      if (muuriRef) muuriRef.current = manager.muuri;

      return () => {
        // Destroy the instance
        manager.muuri.destroy();
        // Unmounting
        if (typeof onUnmount === "function") onUnmount(manager.muuri);
        // Remove the ref
        if (muuriRef) muuriRef.current = undefined;
      };
    }, []); // eslint-disable-line

    // Add the items if there are new
    useEffect(() => {
      addItems(
        manager.muuri,
        getItems(gridElemRef.current),
        itemsToAdd,
        adjustIndex(itemsToAdd, itemsToRemove)
      );
    }, [manager.addedDep]); // eslint-disable-line

    // Filter the item if there are new or the filter method is changed
    useEffect(() => {
      if (filter) manager.muuri.filter(filter, filterOptions);
    }, [filter, filterOptions, manager.addedDep]); // eslint-disable-line

    // Sort the item if there are new or the sort/filter method are changed
    useEffect(() => {
      if (sort) manager.muuri.sort(sort, sortOptions);
    }, [sort, sortOptions, manager.addedDep]); // eslint-disable-line

    // Remove old items  if there are
    useEffect(() => {
      removeItems(manager.muuri, getItems(gridElemRef.current), itemsToRemove);
    }, [manager.removedDep]); // eslint-disable-line

    return render(allChildren, gridProps, gridElemRef);
  }
);
