/* React */
import React, { Children, useEffect } from "react";
import PropTypes from "prop-types";
/* Component */
import { ItemComponent } from "./itemComponent";
/* Context */
import { GridProvider } from "../contexts";
/* Global map */
import { globalMap } from "../globalMap";
/* Controllers */
import {
  LayoutController,
  ItemAddController,
  ItemRemoveController,
  SortController
} from "../controllers";
/* Utils */
import { decorateMuuri, isDecorated, decorateGrid } from "../utils/decorators";
import { addItems, removeItems, filterItems, sortItems } from "../utils/grid";
import { getItemsOwner, appendFiber, removeFiber } from "../utils/fibers";
import { getIndicesToAdd, getNewChildren } from "../utils/components";
import { useDependency, useMemoized } from "../utils/hooks";

// Grid component.
export function GridComponent({
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
  forceSync,
  dragFixed,
  dragEnabled
}) {
  /* ------------------ */
  /* ----- STORES ----- */
  /* ------------------ */

  // Store references of objects
  // generated on the previous render.
  const store = useMemoized(() => ({
    // The Fiber owner of the items.
    itemsOwner: null,
    // Children of the previous rendered.
    oldChildren: [],
    // Controller that manages the items instancies.
    itemAddController: new ItemAddController(),
    // Controller that manages the items to be removed.
    itemRemoveController: new ItemRemoveController(),
    // Controller that manages the items sizes.
    layoutController: new LayoutController(muuri),
    // Controller that manage the sorting.
    sortController: new SortController(muuri),
    // Keep a reference of the onSend function.
    onSend,
    // Sync needs.
    needFiltering: false,
    needSorting: false
  }));

  // Store references of objects
  // that are used inside useEffect.
  // The reference live only in the render
  // in wich it has been created.
  const vars = {
    // The DOM element.
    grid: null,
    // The indices of the new items.
    indicesToAdd: [],
    // The DOM elements of the new items.
    addedDOMItems: [],
    // The items instances to remove.
    itemsToRemove: [],
    // If an item has been added.
    hasAdded: false,
    // If an item has been removed.
    hasRemoved: false,
    // If the grid has been filtered.
    hasFiltered: false,
    // If the grid has been sorted.
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
    muuri._component.dragFixed = !!dragFixed || null;
    muuri._component.itemRemoveController = store.itemRemoveController;

    // Public decoration.
    muuri.sortController = store.sortController;

    // Add the instance to the global map.
    globalMap.set(muuri, id, groupIds);
  }

  // Set drag enabled option.
  muuri._component.dragEnabled = dragEnabled;

  // Init the controllers.
  store.layoutController.useInit();
  store.itemRemoveController.useInit();
  store.itemAddController.useInit();

  // Initialize the grid on mount.
  useEffect(() => {
    muuri._element = vars.grid;
    decorateGrid(vars.grid, muuri);

    store.itemsOwner = getItemsOwner(vars.grid);

    // Add all the event handlers.
    muuri
      // Send event.
      .on("beforeSend", ({ item, fromGrid, fromIndex }) => {
        if (!item._component.sendPayload) {
          item._component.hasPayload = true;

          item._component.sendPayload = {
            store,
            fromGrid,
            fromIndex
          };
        }
      })
      .on("receive", ({ item, toGrid, toIndex }) => {
        // 'onSend' will be called with the receive event.
        if (!store.onSend)
          throw new Error(
            "An item cannot be sent to another MuuriComponent if the " +
              "'onSend' property has not been passed to the Component."
          );

        // store
        item._component.receivePayload = {
          store,
          toGrid,
          toIndex
        };

        // Emit the event.
        item._component.eventController.emitEvent("send", muuri);
      })

      // Drag event.
      .on("dragInit", item => {
        // Emit the event.
        item._component.eventController.emitEvent("drag", true);
      })
      .on("dragEnd", item => {
        item._component.eventController.emitEvent("drag", false);

        // Emit the event.
        if (item._component.hasPayload) {
          const {
            store: fromStore,
            fromGrid,
            fromIndex
          } = item._component.sendPayload;

          const {
            store: toStore,
            toGrid,
            toIndex
          } = item._component.receivePayload;

          item._component.hasPayload = false;
          item._component.sendPayload = null;
          item._component.receivePayload = null;

          if (fromStore !== toStore) {
            // Update the needs.
            toStore.needFiltering = true;
            toStore.needSorting = true;

            const fiber = removeFiber(
              fromStore.itemsOwner,
              item._component.key
            );
            fromStore.oldChildren.splice(fiber.index, 1);

            // Add the fiber of the child.
            appendFiber(toStore.itemsOwner, fiber);
            // Add a fake child representing the received one.
            toStore.oldChildren.push({ key: fiber.key });

            // Emit the event.
            toStore.onSend({
              // The key the user has set.
              key: item._component.key,
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
          }
        }
      })

      // Show event.
      .on("showStart", items => {
        // The items could be shown before they are decorated.
        if (!isDecorated(items[0])) return;
        // Updates the needs.
        store.needFiltering = true;
        // Emit the event.
        for (const item of items) {
          const eventController = item._component.eventController;
          // The event is triggered also for items that have not
          // changed their 'visibility' state.
          // This check is done to avoid useless re-rendering.
          if (
            eventController.getPayload("show") === false ||
            eventController.getPayload("show") === undefined
          ) {
            eventController.emitEvent("show", true);
          }
        }
      })
      .on("hideEnd", items => {
        // Updates the needs.
        store.needFiltering = true;
        // Emit the event.
        for (const item of items) {
          const eventController = item._component.eventController;
          // The event is triggered also for items that have not
          // changed their 'visibility' state.
          // This check is done to avoid useless re-rendering.
          if (
            eventController.getPayload("show") === true ||
            eventController.getPayload("show") === undefined
          ) {
            eventController.emitEvent("show", false);
          }
        }
      })

      // Move event.
      .on("move", () => {
        // Update the needs.
        store.needSorting = true;
      });

    // Fix the dimensions of the items when they are dragged.
    if (dragFixed) {
      muuri
        .on("dragInit", item => {
          // Let's set fixed widht/height to the dragged item
          // so that it does not stretch unwillingly when
          // it's appended to the document body for the
          // duration of the drag.
          const element = item.getElement();
          // Get the computed dimensions.
          const { width, height } = getComputedStyle(element);
          // Save the previous style in case it was setted.
          item._component.dragWidth = element.style.width;
          item._component.dragHeight = element.style.height;
          // Set new style.
          element.style.width = width;
          element.style.height = height;
        })
        .on("dragReleaseEnd", item => {
          // Let's remove the fixed width/height from the
          // dragged item now that it is back in a grid
          // column and can freely adjust to it's
          // surroundings.
          const element = item.getElement();
          // Set the old style.
          element.style.width = item._component.dragWidth;
          element.style.height = item._component.dragHeight;
        });
    }

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
    if (store.itemsOwner.alternate)
      store.itemsOwner = store.itemsOwner.alternate;

    // Items to add/remove.
    vars.addedDOMItems = getNewChildren(muuri, vars.indicesToAdd);

    vars.itemsToRemove = store.itemRemoveController.getItemsToRemove();
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
    store.itemAddController.emit(addedItems);
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
      if (store.sortController.isToken(sort)) {
        sort = store.sortController.getKeysList(sort); // eslint-disable-line
      }

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
  const value = useMemoized(() => ({
    layoutController: store.layoutController,
    muuri
  }));

  // render.
  return (
    <GridProvider value={value}>
      <div ref={grid => (vars.grid = grid)}>
        {Children.map(children, child => (
          <ItemComponent
            key={child.key}
            id={child.key}
            propsToData={propsToData}
            itemAddController={store.itemAddController}
          >
            {child}
          </ItemComponent>
        ))}
      </div>
    </GridProvider>
  );
}

// Proptypes.
GridComponent.propTypes = {
  muuri: PropTypes.object.isRequired,
  id: PropTypes.string,
  groupIds: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
  ]),
  sortOptions: PropTypes.exact({
    descending: PropTypes.bool
  }),
  addOptions: PropTypes.exact({
    show: PropTypes.bool
  }),
  onSend: PropTypes.func,
  forceSync: PropTypes.bool,
  dragFixed: PropTypes.bool,
  dragEnabled: PropTypes.bool
};

// Default props.
GridComponent.defaultProps = {
  addOptions: { show: true },
  sortOptions: { descending: false },
  forceSync: false,
  dragFixed: false,
  dragEnabled: false
};

// Display name.
GridComponent.displayName = "GridComponent";
