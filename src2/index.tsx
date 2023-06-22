import Grid, { GridOptions } from 'muuri';
import {
  useCallback,
  useRef,
  RefCallback,
  MutableRefObject,
  useEffect,
  useState,
  useInsertionEffect,
  useLayoutEffect,
  createContext,
  HTMLAttributes,
} from 'react';

import { createPortal } from 'react-dom';

const App = ({ children }) => {
  const gridOptions = {
    context: {},
    dragEnabled: true,
    id: '',
    // FIXME: WE WILL NOTE EXPOSE ANY GRID OR ITEM instance
    onDragInit: (event) => {},
  };

  // ARE there any global uitlity to return?
  // - global refresh? -> may handle it automatically for the grid and automatically+manually for item
  // FIXME: use this ? https://github.com/bvaughn/react-window#can-i-attach-custom-properties-or-event-handlers
  return <div ref={useGrid(gridOptions)}>{children}</div>;
};

const context = createContext(null);

// We need
//  - we want the api to be as simple as possble, and to be headless where possible -> we provide a ref
//  - instance must be ready for children useLayoutEffect -> lazy initialization
//  - the instance lifecycle must be managed inside effects, e.g. it cannot be created inside the ref callback.
//    or will break react constraint (e.g. <StrictMode> -> render,render,mount,unmount,mount -> the ref callback is not called after unmount) -> lazy init function passed to the item
//
// FIXME: WE NEED TO CREATE/DESTROY muuri + ATTACH/DEATTACH muuri getter
//   CODE SHOULD BE READABLE TOP-DOWN!,  be carefull of memory leak
//    The instance is not created at first if no items?
function useGrid(options: GridOptions) {
  const gridElementRef = useRef<HTMLElement>(null);
  const gridRef = useRef<Grid | null>(null);

  // FIXME: CANNOT CALL FIRST TIME IF OFFSCREEN
  const getGrid = useCallback(
    () =>
      gridRef.current === null
        ? (gridRef.current = createGrid(gridElementRef.current as HTMLElement))
        : gridRef.current,
    []
  );

  useLayoutEffect(() => {
    if (gridRef.current) {
      // DYNAMIC OPTIONS:
      //  - dragEnabled
      //  - context
      //  - groupids
      //  - dragAutoScroll??
      //  - dragContainer??
      handleDynamicOptions(gridRef.current, options);
      initGroupLayout(gridRef.current);
    }
  });

  useEffect(() => {
    return () => {
      if (gridRef.current) {
        // free element from muuri instance;
        deattachGrid(gridRef.current._element);
        destroy(gridRef.current);
        // NOTE: NEED to nullify (https://github.com/reactwg/react-18/discussions/18)
        gridRef.current = null;
      }
    };
  }, []);

  return gridElementRef;
}

const a: HTMLAttributes<HTMLDivElement> = {};

const d = document.createElement('div');

// FIXME: react may use "parent.insertBefore(...)" to insert elements (new or moved ones)
//        we need to wrap that method to ensure it does not broke wehn a item is being dragged (muuri detach the child element)
function useItem({ isDraggable, isShowing, showOnInit }) {
  const [state, setState] = useState({
    isDragging: false,
    isShowing: showOnInit,
    // ??refresh: () => {}
  });

  const monitor = {
    isDragging: false,
  };

  // USEFEECT IN ENOUGH?
  useLayoutEffect(() => {
    if (getItem(itemElementRef.current) === null) {
      const grid = getGrid(itemElementRef.current.parentElement);
      const item = createItem(grid, itemElementRef.current);

      setItem(itemElementRef.current, item);

      // TODO: we just need to describe that an item want to be notified on drag....
      itemRef.current.setIdragging = (isDragging) =>
        setState((state) => ({ ...state, isDragging }));
      itemRef.current.setIshowing = (isShowing) =>
        setState((state) => ({ ...state, isShowing }));
    }

    return () => {
      // TODO: remove this? just warnng?
      invariant(grid.hasPartecipatedRender);

      // TODO: do we need to destroy? can thi be handled by the grid (grid.remove destroy the items)
      // hopefully we just need to describe that the item dont have to be notified anymore...
      itemRef.current.setIsDragging = null;
      itemRef.current.setIsShowing = null;
    };
  }, []);

  // TODO: automatically regresh items based on DOM dimensions? handle HIDDEN items (display: none) --> default case + èrpvide methods for doing it manually?
  useEffect(() => {
    // FIXME: how to handle sorting????? Muuri RECALC ALL LAYOUT at each change -> no need of any optimization here
    //                                  we could wrap the grid element appendChild and insertBefore mthods -> once called trigger a flag "needResort"
    //                                  // and take the sort from the dom  gridElement.children.map(el -> el.$item)
  });

  const render = useCallback(({ children }) => {
    return createPortal(children, element);
  }, []);

  return [
    render,
    {
      get isDragging() {
        monitor.isDragging = true;
        return state.isDragging;
      },
    },
  ];
}

function initGroupLayout(grid: Grid) {
  grid.itemsToAdd = [];
  grid.itemsToRemove = [];
  grid.ietmsToRefresh = [];
}

function endGroupLayout(grid: Grid) {
  grid.itemsToAdd = null;
  grid.itemsToRemove = null;
  grid.ietmsToRefresh = null;
}

function createGrid(element: HTMLElement, options: GridOptions) {
  const grid: DecoratedGrid = new Muuri(element, options);

  options = {
    ...options,

    items: [],
    // Muuri (0.9.0) generate the "ItemDrag" instances only if
    // drag is enabled. These instances do not handle scrolling well on touch devices,
    // so we only create these instances if drag-and-drop have to be used
    // (assuming that a boolean is passed to the prop instead of the default value "null").
    // The enabling / disabling of the drag is managed in dragStartPredicate.
    // @ts-ignore
    dragEnabled: options.dragEnabled !== null,
    // Should be solved, we can generate always generate the instances and disable dragStartPredicate
    dragEnabled: true,
    // Classnames, are non "reactish", but maybe leave them and make muuri defaults to empty classes? (muuri.defaultOptions...)
    containerClass: '',
    itemClass: '',
    itemVisibleClass: '',
    itemHiddenClass: '',
    itemPositioningClass: '',
    itemDraggingClass: '',
    itemReleasingClass: '',
    itemPlaceholderClass: '',

    sortData: null,
    a: setDragSort(options, muuriMap),
    // Allow the target elements to be React.Ref<HTMLElement>.
    a: setDragAutoScroll(options),
    // Allow enabling / disabling the drag-and-drop.
    a: setDragStartPredicate(options),
    // Allow the drag container to be a React.Ref<HTMLElement>.
    // @ts-ignore
    a: setDragContainer(grid._settings),
  };
}

function usePortal() {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const parentElem = document.querySelector(`#${id}`);
      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current);
      // This function is run on unmount
      return function removeElement() {
        rootElemRef.current.remove();
      };
    },
    [id]
  );

  return rootElemRef.current;
}
