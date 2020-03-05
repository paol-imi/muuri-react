/* React */
import React, { Children, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
/* Controllers */
import {
  LayoutController,
  ItemController,
  RemoveController
} from "../controllers";
/* Component */
import { ItemComponent } from "./itemComponent";
/* Context */
import { GridProvider } from "../contexts";
/* Utils */
import { getKey, getIndicesToAdd } from "../utils/components";
import { decorateMuuri, isDecorated } from "../utils/decorators";
import { useDependency } from "../utils/hooks";
import { addItems, removeItems, filterItems, sortItems } from "../utils/muuri";
import {
  getItemsOwner,
  appendChild,
  removeChild,
  getStateNodes
} from "../utils/fibers";
/* Global map */
import { globalMap } from "../globalMap";

// Grid component.
export const GridComponent = function({
  children,
  id,
  groupIds,
  muuri,
  filter,
  sort,
  sortOptions,
  addOptions,
  propsToData,
  onSend,
  forceSync
}) {
  /* ------------------ */
  /* ----- STORES ----- */
  /* ------------------ */

  // Store references of objects
  // generated on the previous render.
  const store = useMemo(
    () => ({
      // The Fiber owner of the items.
      itemsOwner: null,
      // Children of the previous rendered.
      oldChildren: [],
      // Controller that manages the items instancies.
      itemController: new ItemController(),
      // Controller that manages the items to be removed.
      removeController: new RemoveController(),
      // Controller that manages the items sizes.
      layoutController: new LayoutController(muuri),
      // Keep a reference of the onSend function.
      onSend,
      // Sync needs.
      needFiltering: false,
      needSorting: false
    }),
    [] // eslint-disable-line
  );

  // Store references of objects
  // that are used inside useEffect.
  // The reference live only in the render
  // in wich it has been created.
  const vars = {
    grid: null,
    indicesToAdd: [],
    addedDOMItems: [],
    itemsToRemove: [],
    hasAdded: false,
    hasRemoved: false,
    hasFiltered: false,
    hasSorted: false
  };

  /* ------------------ */
  /* ------ INIT ------ */
  /* ------------------ */

  // Add id & groupIds, (just one time).
  if (!isDecorated(muuri)) {
    decorateMuuri(muuri);
    muuri._component.id = id || null;
    muuri._component.groupIds = groupIds || null;
    muuri._component.removeController = store.removeController;

    // Add the instance to the global map.
    globalMap.set(muuri, id, groupIds);
  }

  // Init the controllers.
  store.layoutController.useInit();
  store.removeController.useInit();
  store.itemController.useInit();

  // Initialize the grid on mount.
  useEffect(() => {
    // Add all the event handlers.
    muuri
      // Send event.
      .on("beforeSend", ({ item }) => {
        // 'onSend' will be called with the receive event.
        if (!onSend)
          throw new Error(
            "An item cannot be sent to another grid if the " +
              "'onSend' property has not been passed to the Component."
          );

        // TODO: solve this bug.
        if (item._component.eventController.isEnabled())
          throw new Error(
            "An item cannot be sent to another grid if it " +
              "is using an event hook (useDrag, useShow).\n" +
              "This will be fixed in future updates."
          );

        // Remove the fiber of the child.
        const fiber = removeChild(store.itemsOwner, item._component.key);
        // Add the fiber to the item as a payload.
        item._component.fiber = fiber;
        // Remove the child representing the sended one.
        store.oldChildren.splice(fiber.index, 1);
      })
      .on("receive", ({ item, fromGrid, toGrid, fromIndex, toIndex }) => {
        // 'onSend' will be called with the receive event.
        if (!onSend)
          throw new Error(
            "An item cannot be sent to another grid if the " +
              "'onSend' property has not been passed to the Component."
          );

        // TODO: solve this bug.
        if (item._component.eventController.isEnabled())
          throw new Error(
            "An item cannot be sent to another grid if it " +
              "is using an event hook (useDrag, useHook).\n" +
              "This will be fixed in future updates."
          );

        // Update the needs.
        store.needFiltering = true;
        store.needSorting = true;

        // Add the fiber of the child.
        appendChild(store.itemsOwner, item._component.fiber);
        // Add a fake child representing the received one.
        store.oldChildren.push({ key: item._component.fiber.key });
        // For Garbage collector.
        item._component.fiber = null;

        // Emit the event.
        store.onSend({
          // The key the user has set.
          key: getKey(item._component.key),
          // The effectivly key of the component.
          componentKey: item._component.key,
          // From.
          fromGrid,
          fromIndex,
          fromId: fromGrid._component.id,
          fromGroupId: fromGrid._component.groupIds,
          // To.
          toGrid,
          toIndex,
          toId: toGrid._component.id,
          toGroupId: toGrid._component.groupIds
        });
      })

      // Drag event.
      .on("dragInit", item => {
        // Emit the event.
        item._component.eventController.emitEvent("drag", true);
      })
      .on("dragEnd", item => {
        // Emit the event.
        item._component.eventController.emitEvent("drag", false);
      })

      // Show event.
      .on("showStart", items => {
        // The items could be shown before they are decorated.
        if (!isDecorated(items[0])) return;
        // Updates the needs.
        store.needFiltering = true;
        // Emit the event.
        for (let item of items) {
          // The event is triggered also for items that have not
          // changed their 'visibility' state.
          // This check is done to avoid useless re-rendering.
          if (item._component.eventController.getPayload("show") === false) {
            item._component.eventController.emitEvent("show", true);
          }
        }
      })
      .on("hideEnd", items => {
        // Updates the needs.
        store.needFiltering = true;
        // Emit the event.
        for (let item of items) {
          // The event is triggered also for items that have not
          // changed their 'visibility' state.
          // This check is done to avoid useless re-rendering.
          if (item._component.eventController.getPayload("show") === true) {
            item._component.eventController.emitEvent("show", false);
          }
        }
      })

      // Move event.
      .on("move", () => {
        // Update the needs.
        store.needSorting = true;
      });

    // Delete the instance from the global map.
    return () => {
      globalMap.delete(muuri, id, groupIds);
    };
  }, []); // eslint-disable-line

  /* -------------------- */
  /* --- ADD & REMOVE --- */
  /* -------------------- */

  // New children array.
  const newChildren = Children.toArray(children);

  // Indices of the items to add.
  vars.indicesToAdd = getIndicesToAdd(newChildren, store.oldChildren);

  // Add/remove flags.
  vars.hasAdded = vars.indicesToAdd.length > 0;
  vars.hasRemoved =
    newChildren.length < store.oldChildren.length + vars.indicesToAdd.length;

  // Update old children.
  store.oldChildren = newChildren;
  // This will remove lot of the implementation
  // problems for the user.
  store.onSend = onSend;

  // Hooks Dependencies.
  const addedDep = useDependency(vars.hasAdded);
  const removedDep = useDependency(vars.hasRemoved);
  const forceSortDep = useDependency(forceSync && store.needSorting);
  const forceFilterDep = useDependency(forceSync && store.needFiltering);

  // Get items to add/remove.
  useEffect(() => {
    // The Fiber owner of the items.
    store.itemsOwner = getItemsOwner(vars.grid);

    // Items to add/remove.
    vars.addedDOMItems = getStateNodes(store.itemsOwner, vars.indicesToAdd);
    vars.itemsToRemove = store.removeController.getItemsToRemove();
  });

  // Remove the items.
  useEffect(() => {
    removeItems(muuri, vars.itemsToRemove);
  }, [removedDep]); // eslint-disable-line

  // Add the DOMItems.
  useEffect(() => {
    addItems(muuri, vars.addedDOMItems, vars.indicesToAdd, addOptions, filter);
    // New Items.
    const addedItems = muuri.getItems(vars.indicesToAdd);
    // Emit the new items to the itemComponents.
    store.itemController.emit(addedItems);
  }, [addedDep]); // eslint-disable-line

  /* --------------------- */
  /* --- SORT & FILTER --- */
  /* --------------------- */

  // Filter the items if there are new or the filter method is changed.
  useEffect(() => {
    if (filter) {
      vars.hasFiltered = true;
      store.needFiltering = false;
      filterItems(muuri, filter);
    }
  }, [filter, forceFilterDep, addedDep]); // eslint-disable-line

  // Sort the items if there are new or the sort method are changed.
  useEffect(() => {
    if (sort) {
      vars.hasSorted = true;
      store.needSorting = false;
      sortItems(muuri, sort, sortOptions);
    }
  }, [sort, sortOptions, forceSortDep, addedDep]); // eslint-disable-line

  /* ------------------------ */
  /* --- REFRESH & LAYOUT --- */
  /* ------------------------ */

  // Interact with muuri only in the end
  // for performance optiomization purpose.
  useEffect(() => {
    const needRefresh = store.layoutController.needRefresh();
    const needLayout = store.layoutController.needLayout();

    // If a refreshItems call is needed.
    if (needRefresh) {
      muuri.refreshItems(store.layoutController.getItemsToRefresh());
    }

    // Layout.
    if (
      vars.hasAdded ||
      vars.hasRemoved ||
      vars.hasSorted ||
      vars.hasFiltered ||
      needLayout
    ) {
      muuri.layout();
    }
  });

  /* ------------------ */
  /* ----- RENDER ----- */
  /* ------------------ */

  // Provided value doesn't change the reference.
  const value = useMemo(
    () => ({ layoutController: store.layoutController, muuri }),
    [] // eslint-disable-line
  );

  // render.
  return (vars.grid = (
    <GridProvider value={value}>
      {Children.map(children, child => (
        <ItemComponent
          key={child.key}
          id={child.key}
          propsToData={propsToData}
          itemController={store.itemController}
        >
          {child}
        </ItemComponent>
      ))}
    </GridProvider>
  ));
};

GridComponent.propTypes = {
  muuri: PropTypes.any.isRequired,
  id: PropTypes.string,
  groupIds: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.array
  ]),
  sortOptions: PropTypes.exact({
    descending: PropTypes.bool
  }),
  addOptions: PropTypes.exact({
    show: PropTypes.bool
  }),
  onSend: PropTypes.func,
  forceSync: PropTypes.bool
};

GridComponent.defaultProps = {
  addOptions: { show: true },
  sortOptions: { descending: false },
  forceSync: false
};

GridComponent.displayName = "GridComponent";
