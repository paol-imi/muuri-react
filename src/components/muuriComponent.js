import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Muuri from "muuri";
import { useGlobalHook as useGlobalRefresh } from "../hooks/refreshHook";
import { GridComponent } from "./gridComponent";
import {
  getUpdates,
  addItems,
  getDOMItems,
  adjustIndices,
  removeItems,
  ItemsMap,
  getSortData,
  decorateItems,
  setItemsData,
  useMemoizedOptions
} from "../utils";

// The component
export const MuuriComponent = forwardRef(function MuuriComponent(
  {
    children,
    options,
    gridProps,
    filter,
    sort,
    filterOptions,
    sortOptions,
    onMount,
    onUnmount,
    propsAsSortData,
    removeOptions = { hide: true },
    addOptions = { show: true },
    instantLayout = false
  },
  muuriRef
) {
  // Memoize options to avoid useless re-rendering.
  // This will also remove the layout options.
  filterOptions = useMemoizedOptions(filterOptions, { instant: false });
  sortOptions = useMemoizedOptions(sortOptions, { descending: false });

  // Grid element ref
  const gridElemRef = useRef();
  const internalMuuriRef = useRef();

  // Store all the old data
  const memo = useMemo(
    () => ({
      // Muuri instance
      muuri: undefined,
      // old Children Rendered
      oldChildren: [],
      // Map of items-Components
      itemsMap: new ItemsMap(),
      // Dependecies for the useEffect triggering
      addedDep: {},
      removedDep: {},
      // props as sort data
      propsAsSortData
    }),
    [] // eslint-disable-line
  );

  // Children to array
  children = React.Children.toArray(children);

  // Update data
  const { indicesToAdd, indicesToRemove, allChildren } = getUpdates(
    children,
    memo.oldChildren
  );

  // Update memo data
  memo.oldChildren = children;
  if (indicesToAdd.length) memo.addedDep = {};
  if (indicesToRemove.length) memo.removedDep = {};

  // Generate the Muuri instance on mounting
  // and destroy it on anmounting
  useEffect(() => {
    options = options || {}; // eslint-disable-line
    // Items will be added in the next effect
    if (!options.items) options.items = [];
    // To avoid bug on re-rendering if an item is dragging
    options.dragContainer = gridElemRef.current;
    // sort
    options.sortData = Object.assign(
      options.sortData || {},
      getSortData(propsAsSortData)
    );
    // Generate the instance
    memo.muuri = new Muuri(gridElemRef.current, options);
    // on unmount
    return () => {
      // Destroy the instance
      memo.muuri.destroy();
    };
  }, []); // eslint-disable-line

  // Muuri on mount
  useEffect(() => {
    // Set the ref
    internalMuuriRef.current = memo.muuri;
    if (muuriRef) muuriRef.current = memo.muuri;
    // Mounting
    if (typeof onMount === "function") onMount(memo.muuri);
    // on unmount
    return () => {
      // Remove the ref
      internalMuuriRef.current = undefined;
      if (muuriRef) muuriRef.current = undefined;
      // Unmounting
      if (typeof onUnmount === "function") onUnmount(memo.muuri);
    };
  }, []); // eslint-disable-line

  // Items data
  useEffect(() => {
    // Get DOMItems data
    const { DOMItems, DOMItemsToRemove, addedDOMItems } = getDOMItems(
      gridElemRef.current,
      indicesToAdd,
      indicesToRemove.length
    );

    // Set Items Data
    memo.DOMItems = DOMItems;
    memo.DOMItemsToRemove = DOMItemsToRemove;
    memo.addedDOMItems = addedDOMItems;
    memo.newItemsIndeces = adjustIndices(indicesToAdd, indicesToRemove);
  });

  // Add the items if there are new
  useEffect(() => {
    addItems(memo.muuri, memo.addedDOMItems, memo.newItemsIndeces, addOptions);
  }, [memo.addedDep]); // eslint-disable-line

  // Remove old items if there are
  useEffect(() => {
    removeItems(memo.muuri, memo.DOMItemsToRemove, removeOptions);
  }, [memo.removedDep]); // eslint-disable-line

  // update the itemsMap
  useEffect(() => {
    // The items are ordered here so in other parts of the code
    // they can be finded using an index insted of searching in the whole list.
    const orderedItems = memo.muuri.getItems(memo.DOMItems);
    // Decorate the items
    decorateItems(memo.muuri.getItems(memo.newItemsIndeces));
    setItemsData(children, orderedItems);
    // Link the items
    memo.itemsMap.add(children, orderedItems);
    if (memo.propsAsSortData) memo.muuri.refreshSortData();
  });

  // Refresh hook
  const global = useGlobalRefresh(internalMuuriRef, memo.itemsMap);

  // Filter the item if there are new or the filter method is changed
  useEffect(() => {
    if (filter) memo.muuri.filter(filter, filterOptions);
  }, [filter, filterOptions, memo.addedDep]); // eslint-disable-line

  // Sort the item if there are new or the sort/filter method are changed
  useEffect(() => {
    if (sort) memo.muuri.sort(sort, sortOptions);
  }, [sort, sortOptions, memo.addedDep]); // eslint-disable-line

  // Call layout a the end for performance otpimization
  useEffect(() => {
    if (
      indicesToAdd.length ||
      indicesToRemove.length ||
      filter ||
      sort ||
      global.consumeLayoutRequest()
    )
      memo.muuri.layout(instantLayout);
  });

  // render
  return (
    <GridComponent gridProps={gridProps} ref={gridElemRef}>
      {allChildren}
    </GridComponent>
  );
});

MuuriComponent.propTypes = {
  options: PropTypes.object,
  gridProps: PropTypes.object,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.array
  ]),
  filterOptions: PropTypes.exact({
    instant: PropTypes.bool
  }),
  sortOptions: PropTypes.exact({
    descending: PropTypes.bool
  }),
  propsAsSortData: PropTypes.arrayOf(PropTypes.string.isRequired),
  removeOptions: PropTypes.exact({
    hide: PropTypes.bool
  }),
  addOptions: PropTypes.exact({
    show: PropTypes.bool
  }),
  instantLayout: PropTypes.bool
};
