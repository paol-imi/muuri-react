/* React */
import React, {createRef, RefObject, useEffect} from 'react';
import PropTypes from 'prop-types';
/* Components */
import {ItemComponent} from './itemComponent';
/* Context */
import {GridProvider} from '../contexts';
/* Controllers */
import {
  ChildrenController,
  FiberController,
  ItemAddController,
  ItemRemoveController,
  LayoutController,
} from '../controllers';
/* Utils */
import {invariant} from '../invariant';
import {fillGridElement, fillGrid} from '../utils/fillers';
import {useReference, useMemoized} from '../utils/hooks';
import {addDecoration, getDecoration, isDecorated} from '../utils/decorators';
import {
  addItems,
  filterItems,
  getGridClass,
  getItemClasses,
  hideItems,
  removeItems,
  showItems,
  sortItems,
} from '../utils/grid';
/* Interfaces */
import type {GridComponentProps, DecoratedItem} from '../interfaces';

// Grid component.
export function GridComponent({
  children,
  gridProps,
  grid,
  filter,
  sort,
  sortOptions,
  addOptions,
  propsToData,
  onSend,
  onDragStart,
  onDragEnd,
  onFilter,
  onSort,
  onMount,
  onUnmount,
  forceSync,
  dragFixed,
  dragEnabled,
  instantLayout,
}: GridComponentProps) {
  /* ------------------ */
  /* ----- STORES ----- */
  /* ------------------ */

  // Store references of objects
  // generated in previous renders.
  const store = useMemoized<{
    // The grid ref.
    gridRef: RefObject<HTMLDivElement>;
    // The grid className.
    gridClass: string;
    // The items classNames.
    itemClasses: string[];
    // Controller that manages the children.
    childrenController: ChildrenController;
    // Controller that manages the fibers.
    fiberController: FiberController;
    // Controller that manages the items to add.
    itemAddController: ItemAddController;
    // Controller that manages the items to remove.
    itemRemoveController: ItemRemoveController;
    // Controller that manages the items layout.
    layoutController: LayoutController;
    // Keep a reference of the onUnmount function.
    onUnmount?: GridComponentProps['onUnmount'];
    // Keep a reference of the onDragStart function.
    onDragStart?: GridComponentProps['onDragStart'];
    // Keep a reference of the onDragEnd function.
    onDragEnd?: GridComponentProps['onDragEnd'];
    // Keep a reference of the onFilter function.
    onFilter?: GridComponentProps['onFilter'];
    // Keep a reference of the onSort function.
    onSort?: GridComponentProps['onSort'];
    // Keep a reference of the onSend function.
    onSend?: GridComponentProps['onSend'];
  }>(() => ({
    // Grid and items data.
    gridRef: /*      */ createRef(),
    gridClass: /*    */ getGridClass(grid),
    itemClasses: /*  */ getItemClasses(grid),
    // Controllers.
    childrenController: /*    */ new ChildrenController(),
    fiberController: /*       */ new FiberController(),
    itemAddController: /*     */ new ItemAddController(),
    itemRemoveController: /*  */ new ItemRemoveController(),
    layoutController: /*      */ new LayoutController(),
    // Events.
    onUnmount,
    onDragStart,
    onDragEnd,
    onFilter,
    onSort,
    onSend,
  }));

  // Store references of objects
  // that are used inside useEffect.
  // The references are flushed on each new render.
  const vars: {
    /** The positions of the new items. */
    indicesToAdd: number[];
    /** The DOM elements of the new items. */
    addedDOMItems: HTMLElement[];
    /** The items instances to remove. */
    itemsToRemove: DecoratedItem[];
    /** The items instances to refresh. */
    itemsToRefresh: DecoratedItem[];
    /** The items instances to show. */
    itemsToShow: DecoratedItem[];
    /** The items instances to hide. */
    itemsToHide: DecoratedItem[];
    /** If an item has been added. */
    hasAdded: boolean;
    /** If an item has been removed. */
    hasRemoved: boolean;
    /** If the grid has been filtered. */
    hasFiltered: boolean;
    /** If the grid has been sorted. */
    hasSorted: boolean;
    /** If an item has been refreshed. */
    hasRefreshed: boolean;
    /** If an item has been shown. */
    hasShown: boolean;
    /** If an item has been hiiden. */
    hasHidden: boolean;
  } = {
    // Items data.
    indicesToAdd: /*   */ [],
    addedDOMItems: /*  */ [],
    itemsToRemove: /*  */ [],
    itemsToRefresh: /* */ [],
    itemsToShow: /*    */ [],
    itemsToHide: /*    */ [],
    // Items flags.
    hasAdded: /*      */ false,
    hasRemoved: /*    */ false,
    hasFiltered: /*   */ false,
    hasSorted: /*     */ false,
    hasRefreshed: /*  */ false,
    hasShown: /*      */ false,
    hasHidden: /*     */ false,
  };

  /* ----------------- */
  /* ----- MOUNT ----- */
  /* ----------------- */

  // Initialize the grid on mount.
  useEffect(() => {
    /* ------------------ */
    /* ----- EVENTS ----- */
    /* ------------------ */

    // Add all the event handlers.
    grid
      // "Send" and "receive" events.
      .on('beforeSend', ({item, fromGrid, fromIndex}) => {
        if (!getDecoration(item).sentPayload) {
          // Generate the sentPayload.
          const sentPayload = {
            fromChildrenController: store.childrenController,
            fromFiberController: store.fiberController,
            fromGrid,
            fromIndex,
          };

          // Add the decoration.
          addDecoration(item, {sentPayload});
        }
      })
      .on('receive', ({item, toGrid, toIndex}) => {
        // Controllers.
        const toChildrenController = store.childrenController;
        const toFiberController = store.fiberController;

        // If the method is activated by user interaction (the item is being dragged)
        // the synchronization will be performed during the "dragEnd" event.
        // If the method is called via Muuri's instance (the item is not being dragged)
        // the synchronization takes place here, but the onSend callback is not fired.
        if (item.isDragging()) {
          // Generate the receivedPayload.
          const receivedPayload = {
            toChildrenController,
            toFiberController,
            toGrid,
            toIndex,
          };

          // Add the decoration.
          addDecoration(item, {receivedPayload});
        } else {
          // Payloads data.
          const sentPayload = getDecoration(item).sentPayload;
          // The payload must have been created in the send method.
          invariant(sentPayload !== null && typeof sentPayload === 'object');
          // Controllers.
          const {fromChildrenController, fromFiberController} = sentPayload;

          // Remove the payload.
          addDecoration(item, {sentPayload: null});

          // Remove the item instances from the old GridComponent.
          const itemFiber = fromFiberController.remove(item.getKey());
          const itemComponent = fromChildrenController.remove(itemFiber.index);

          // Add the item instances to the new GridComponent.
          toFiberController.append(itemFiber);
          toChildrenController.append(itemComponent);
        }

        // Emit the "send" event.
        getDecoration(item).eventController.emitEvent('send', grid);
      })

      // Drag events.
      .on('dragInit', (item, event) => {
        // The childrenController must change the positions of
        // the newly added components if any items are being
        // dragged to add the safely.
        store.childrenController.incrementDragCounter();
        // Emit the "drag" event.
        // This event is used instead of "dragStart" to allow the
        // reRender of the component when the item is not inside
        // the dragContainer, this makes it possible to change
        // the style of the element safely (e.g. using relative dimensions).
        getDecoration(item).eventController.emitEvent('drag', true);
        // "onDragStart" Callback.
        if (store.onDragStart) store.onDragStart(item, event);
      })
      .on('dragEnd', (item) => {
        // Payloads.
        const sentPayload = getDecoration(item).sentPayload;
        const receivedPayload = getDecoration(item).receivedPayload;

        // If an item was sent during the drag the
        // GridComponents are synchronized.
        if (sentPayload && receivedPayload) {
          // SentPayload data.
          const {
            fromChildrenController,
            fromFiberController,
            fromGrid,
            fromIndex,
          } = sentPayload;

          // ReceivedPayload data.
          const {
            toChildrenController,
            toFiberController,
            toGrid,
            toIndex,
          } = receivedPayload;

          // Reset the payloads.
          addDecoration(item, {sentPayload: null, receivedPayload: null});

          // Check if the item has been sended.
          if (fromGrid !== toGrid) {
            // "onSend" will be called with the receive event.
            invariant(
              typeof store.onSend === 'function',
              'An item cannot be sent to another MuuriComponent if the ' +
                "'onSend' property has not been passed to the MuuriComponent."
            );

            // Remove the item instances from the old GridComponent.
            const itemFiber = fromFiberController.remove(item.getKey());
            const itemComponent = fromChildrenController.remove(
              itemFiber.index
            );

            // Add the item instances to the new GridComponent.
            toFiberController.append(itemFiber);
            toChildrenController.append(itemComponent);

            // "onSend" callback.
            // DragEnd is called in the grid where
            // the drag start, so onSend.
            store.onSend({
              // The key the user has set.
              key: getDecoration(item).key,
              // From.
              fromGrid,
              fromIndex,
              fromId: getDecoration(fromGrid).id,
              fromGroupIds: getDecoration(fromGrid).groupIds,
              // To.
              toGrid,
              toIndex,
              toId: getDecoration(toGrid).id,
              toGroupIds: getDecoration(toGrid).groupIds,
            });
          }
        }
      })
      .on('dragReleaseEnd', (item) => {
        // The childrenController must change the positions of
        // the newly added components if any items are being
        // dragged to add the safely.
        store.childrenController.decrementDragCounter();
        // Emit the event.
        // This event is used instead of "dragEnd" to allow the
        // reRender of the component when the item is not inside
        // the dragContainer, this makes it possible to change
        // the style of the element safely (e.g. using relative dimensions).
        getDecoration(item).eventController.emitEvent('drag', false);
        // Call the event.
        if (store.onDragEnd) store.onDragEnd(item);
      })

      // Show and hide events.
      .on('showStart', (items) => {
        // The items could be shown before they are decorated.
        if (!isDecorated(items[0])) return;
        // Emit the event.
        items.forEach((item) => {
          const eventController = getDecoration(item).eventController;
          // The event is triggered also for items that have not
          // changed their "visibility" state.
          // This check is done to avoid useless re-rendering.
          if (eventController.getPayload('show') !== true) {
            eventController.emitEvent('show', true);
          }
        });
      })
      .on('hideEnd', (items) => {
        // Emit the event.
        items.forEach((item) => {
          const eventController = getDecoration(item).eventController;
          // The event is triggered also for items that have not
          // changed their "visibility" state.
          // This check is done to avoid useless re-rendering.
          if (eventController.getPayload('show') !== false) {
            eventController.emitEvent('show', false);
          }
        });
      })

      // Filter and sort events.
      .on('filter', (shownItems, hiddenItems) => {
        if (store.onFilter) store.onFilter(shownItems, hiddenItems);
      })
      .on('sort', (currentOrder, previousOrder) => {
        if (store.onSort) store.onSort(currentOrder, previousOrder);
      });

    // Fix the dimensions of the items when they are dragged.
    if (dragFixed) {
      grid
        .on('dragInit', (item) => {
          // Let's set fixed widht/height to the dragged item
          // so that it does not stretch unwillingly when
          // it's appended to the document body for the
          // duration of the drag.
          const element = item.getElement();
          // The element must exist.
          invariant(element !== undefined);
          // Get the computed dimensions.
          const {width, height, paddingTop} = getComputedStyle(element);
          // Save the previous style in case it was setted.
          addDecoration(item, {
            dragWidth: element.style.width,
            dragHeight: element.style.height,
            dragPaddingTop: element.style.paddingTop,
          });
          // Set the new style.
          element.style.width = width;
          element.style.height = height;
          element.style.paddingTop = paddingTop;
        })
        .on('dragReleaseEnd', (item) => {
          // Let's remove the fixed width/height from the
          // dragged item now that it is back in a grid
          // column and can freely adjust to it's
          // surroundings.
          const element = item.getElement();
          // The element must exist.
          invariant(element !== undefined);
          // Get the old style.
          const {dragWidth, dragHeight, dragPaddingTop} = getDecoration(item);
          // Restore the previous style in case it was setted.
          element.style.width = dragWidth;
          element.style.height = dragHeight;
          element.style.paddingTop = dragPaddingTop;
        });
    }

    /* ---------------- */
    /* ----- GRID ----- */
    /* -----------------*/

    // Check .
    invariant(store.gridRef.current !== null);

    // Work with the grid.
    // @ts-ignore
    grid._element = store.gridRef.current;
    fillGridElement(store.gridRef.current, store.gridClass);
    fillGrid(grid);

    // "onMount" Callback.
    if (onMount) onMount(grid);

    // Delete the instance from the global map.
    return () => {
      // Destroy the controllers.
      store.childrenController.destroy();
      store.fiberController.destroy();
      store.itemRemoveController.destroy();
      store.itemAddController.destroy();
      store.layoutController.destroy();
    };
  }, []); // eslint-disable-line

  /* ---------------- */
  /* ----- INIT ----- */
  /* -----------------*/

  // Init the controllers.
  store.childrenController.useInit(children);
  store.fiberController.useInit(store.gridRef);
  store.itemRemoveController.useInit();
  store.itemAddController.useInit();
  store.layoutController.useInit();

  // IsChanged flags.
  const isFilterChanged = useReference([filter]);
  const isSortChanged = useReference([sort, sortOptions]);

  // Get items to add/remove.
  useEffect(() => {
    // Set drag enabled option.
    addDecoration(grid, {dragEnabled});

    // Set the items data.
    vars.indicesToAdd = store.childrenController.getIndicesToAdd();
    vars.addedDOMItems = store.fiberController.getStateNodes(vars.indicesToAdd);
    vars.itemsToRemove = store.itemRemoveController.getItemsToRemove();
    vars.itemsToRefresh = store.layoutController.getItemsToRefresh();
    vars.itemsToShow = store.layoutController.getItemsToShow();
    vars.itemsToHide = store.layoutController.getItemsToHide();

    // This will remove lot of the implementation
    // problems for the user.
    store.onUnmount = onUnmount;
    store.onDragStart = onDragStart;
    store.onDragEnd = onDragEnd;
    store.onFilter = onFilter;
    store.onSort = onSort;
    store.onSend = onSend;
  });

  /* ------------------- */
  /* ----- ACTIONS ----- */
  /* ------------------- */

  useEffect(() => {
    /* ---------------------- */
    /* ---- ADD & REMOVE ---- */
    /* ---------------------- */

    // Remove items.
    if (vars.itemsToRemove.length) {
      removeItems(grid, vars.itemsToRemove);
      // Set the flag.
      vars.hasRemoved = true;
    }

    // Add items after the old ones are removed
    // to add them in the right positions.
    if (vars.indicesToAdd.length) {
      addItems(grid, vars.addedDOMItems, vars.indicesToAdd, addOptions, filter);
      // New Items.
      const addedItems = grid.getItems(vars.indicesToAdd);
      // Emit the new items to the itemComponents.
      store.itemAddController.emit(addedItems);
      // Set the flag.
      vars.hasAdded = true;
    }

    /* ------------------------- */
    /* ----- SORT & FILTER ----- */
    /* ------------------------- */

    // Filter items.
    if (filter && (isFilterChanged || vars.hasAdded || forceSync)) {
      filterItems(grid, filter);
      // Set the flag.
      vars.hasFiltered = true;
    }

    // Sort items.
    if (sort && (isSortChanged || vars.hasAdded || forceSync)) {
      sortItems(grid, sort, sortOptions);
      // Set the flag.
      vars.hasSorted = true;
    }

    /* ----------------------- */
    /* ----- SHOW & HIDE ----- */
    /* ----------------------- */

    // Filter has priority on the items visibility.
    if (!filter && vars.itemsToShow.length) {
      showItems(grid, vars.itemsToShow);
      // Set the flag.
      vars.hasShown = true;
    }

    // Filter has priority on the items visibility.
    if (!filter && vars.itemsToHide.length) {
      hideItems(grid, vars.itemsToHide);
      // Set the flag.
      vars.hasHidden = true;
    }

    /* ------------------- */
    /* ----- REFRESH ----- */
    /* ------------------- */

    // Items with dimensions to refresh.
    if (vars.itemsToRefresh.length) {
      grid.refreshItems(vars.itemsToRefresh);
      // Set the flag.
      vars.hasRefreshed = true;
    }

    /* ------------------ */
    /* ----- LAYOUT ----- */
    /* ------------------ */

    // Layout is calculated only in the end.
    // Check the previous flags.
    if (
      vars.hasAdded ||
      vars.hasRemoved ||
      vars.hasSorted ||
      vars.hasFiltered ||
      vars.hasRefreshed ||
      vars.hasShown ||
      vars.hasHidden
    ) {
      grid.layout(instantLayout);
    }
  });

  /* ------------------ */
  /* ----- RENDER ----- */
  /* ------------------ */

  // Provided value doesn't change the reference.
  const value = useMemoized(() => ({
    layoutController: store.layoutController,
    grid,
  }));

  // render.
  return (
    <GridProvider value={value}>
      <div
        {...gridProps}
        ref={store.gridRef}
        {...store.fiberController.getFlagProp()}>
        {/** The children controller handle some memoization */}
        {store.childrenController.render((child, key) => (
          <ItemComponent
            key={key}
            itemKey={key}
            grid={grid}
            propsToData={propsToData}
            itemClasses={store.itemClasses}
            itemAddController={store.itemAddController}
            itemRemoveController={store.itemRemoveController}>
            {child}
          </ItemComponent>
        ))}
      </div>
    </GridProvider>
  );
}

// Proptypes.
GridComponent.propTypes = {
  grid: PropTypes.object.isRequired,
  gridProps: PropTypes.object,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sort: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  sortOptions: PropTypes.exact({
    descending: PropTypes.bool,
  }),
  addOptions: PropTypes.exact({
    show: PropTypes.bool,
  }),
  onSend: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  forceSync: PropTypes.bool,
  dragFixed: PropTypes.bool,
  dragEnabled: PropTypes.bool,
  instantLayout: PropTypes.bool,
};

// Default props.
GridComponent.defaultProps = {
  gridProps: {},
  addOptions: {show: true},
  sortOptions: {descending: false},
  forceSync: false,
  dragFixed: false,
  dragEnabled: false,
  instantLayout: false,
};

// Display name.
GridComponent.displayName = 'GridComponent';
