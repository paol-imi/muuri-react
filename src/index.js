import React, { forwardRef, useMemo, useRef, useEffect } from "react";
import { useGlobalHook as useRefreshHook } from "./refreshHook";
import {
  getUpdates,
  render,
  addItems,
  getChildren,
  adjustIndex,
  removeItems
} from "./utils";
import Muuri from "muuri";

// The component
export const MuuriComponent = forwardRef(
  (
    {
      children,
      options,
      gridProps,
      onMount,
      onUnmount,
      filter,
      sort,
      filterOptions,
      sortOptions
    },
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
        removedDep: {}
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

    // Refresh global hook called after muuriRef.current
    // has been setted
    useRefreshHook(muuriRef, allChildren);

    // Add the items if there are new
    useEffect(() => {
      addItems(
        manager.muuri,
        getChildren(manager.muuri.getElement()),
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

    // Remove old items if there are
    useEffect(() => {
      removeItems(
        manager.muuri,
        getChildren(manager.muuri.getElement()),
        itemsToRemove
      );
    }, [manager.removedDep]); // eslint-disable-line

    // render
    return render(allChildren, gridProps, gridElemRef);
  }
);
