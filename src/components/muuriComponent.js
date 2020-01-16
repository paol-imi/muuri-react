import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Muuri from "muuri";
import { useGlobalHook as useGlobalRefresh } from "../hooks/refreshHook";
import { GridComponent } from "./gridComponent";
import {
  getUpdates,
  addItems,
  getDOMItems,
  adjustIndex,
  removeItems,
  ItemsMap,
  getSortData,
  getAddedDOMItems
} from "../utils";

// The component
export const MuuriComponent = forwardRef(function MuuriComponent(
  {
    children,
    options,
    gridProps,
    onMount,
    onUnmount,
    filter,
    sort,
    filterOptions,
    sortOptions,
    propsAsSortData
  },
  muuriRef
) {
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
      removedDep: {}
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
      getSortData(memo.itemsMap, propsAsSortData)
    );
    // Generate the instance
    memo.muuri = new Muuri(gridElemRef.current, options);
    // on unmount
    return () => {
      // Destroy the instance
      memo.muuri.destroy();
    };
  }, []); // eslint-disable-line

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

  useEffect(() => {
    // Set the DOMItems
    memo.DOMItems = getDOMItems(memo.muuri.getElement());
    memo.itemsMap.add(allChildren, memo.DOMItems);
  });

  // Refresh hook
  useGlobalRefresh(internalMuuriRef, memo.itemsMap);

  // Add the items if there are new
  useEffect(() => {
    addItems(
      memo.muuri,
      getAddedDOMItems(memo.DOMItems, indicesToAdd),
      adjustIndex(indicesToAdd, indicesToRemove)
    );
  }, [memo.addedDep]); // eslint-disable-line

  // Filter the item if there are new or the filter method is changed
  useEffect(() => {
    if (filter) memo.muuri.filter(filter, filterOptions);
    else memo.muuri.filter(() => true);
  }, [filter, filterOptions, memo.addedDep]); // eslint-disable-line

  // Sort the item if there are new or the sort/filter method are changed
  useEffect(() => {
    if (sort) memo.muuri.sort(sort, sortOptions);
  }, [sort, sortOptions, memo.addedDep]); // eslint-disable-line

  // Remove old items if there are
  useEffect(() => {
    removeItems(memo.muuri, memo.DOMItems, indicesToRemove.length);
  }, [memo.removedDep]); // eslint-disable-line

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
  filter: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
  sort: PropTypes.oneOf([PropTypes.string, PropTypes.func, PropTypes.array]),
  filterOptions: PropTypes.object,
  sortOptions: PropTypes.object,
  propsAsSortData: PropTypes.arrayOf(PropTypes.string)
};
