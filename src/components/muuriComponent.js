/* React */
import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
/* Muuri */
import Muuri from "muuri";
/* Global map */
import { globalMap } from "../globalMap";
/* Component */
import { GridComponent } from "./gridComponent";
/* Utils */
import { useMemoized } from "../utils/hooks";
import {
  setDragSort,
  setDragStartPredicate,
  setDragAutoScroll,
  setDragContainer,
  getTemporaryGrid
} from "../utils/muuri";

// Muuri component.
export const MuuriComponent = forwardRef(function MuuriComponent(
  {
    /* MuuriComponent options */
    gridProps,
    onMount,
    onUnmount,
    beforeMount,
    /* GridComponent options */
    children,
    id,
    groupIds,
    filter,
    sort,
    sortOptions,
    addOptions,
    propsToData,
    onSend,
    forceSync,
    dragFixed,
    dragEnabled,
    /* Muuri options */
    ...options
  },
  muuriRef
) {
  // Generate the Muuri instance on Mount
  // and destroy it on Unmount.
  const muuri = useMemoized(() => {
    // Remove the standard option '*'.
    options.items = [];

    // If drag is not setted it is disabled,
    // otherwise it will be managed in dragStartPredicate.
    options.dragEnabled = dragEnabled !== null;

    // Set the drag container.
    setDragContainer(options);

    // Wrap the dragSort option.
    setDragSort(options, globalMap);

    // Wrap the dragAutoScroll option.
    setDragAutoScroll(options);

    // Wrap the dragStartPredicate option.
    setDragStartPredicate(options);

    // Generate a temporary element.
    const [grid, done] = getTemporaryGrid();
    // Generate the instance.
    const muuri = new Muuri(grid, options);
    // Done.
    done();

    // Set the ref.
    if (muuriRef) muuriRef.current = muuri;
    if (onMount) onMount(muuri);

    return muuri;
  }); // eslint-disable-line

  //
  useEffect(() => {
    // Clean-up.
    return () => {
      // Unset the ref.
      if (onUnmount) onUnmount(muuri);
      if (muuriRef) muuriRef.current = null;
      // Destroy the instace
      muuri.destroy();
    };
  }, []); // eslint-disable-line

  // Render.
  return (
    <GridComponent
      id={id}
      groupIds={groupIds}
      muuri={muuri}
      filter={filter}
      sort={sort}
      sortOptions={sortOptions}
      addOptions={addOptions}
      propsToData={propsToData}
      onSend={onSend}
      forceSync={forceSync}
      dragFixed={dragFixed}
      dragEnabled={dragEnabled}
    >
      {children}
    </GridComponent>
  );
});

// Proptypes.
MuuriComponent.propTypes = {
  gridProps: PropTypes.object,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  beforeMount: PropTypes.func,
  // Default show animation
  showDuration: PropTypes.number,
  showEasing: PropTypes.string,

  // Default hide animation
  hideDuration: PropTypes.number,
  hideEasing: PropTypes.string,

  // Item's visible/hidden state styles
  visibleStyles: PropTypes.object,
  hiddenStyles: PropTypes.object,

  // Layout
  layout: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      fillGaps: PropTypes.bool,
      horizontal: PropTypes.bool,
      alignRight: PropTypes.bool,
      alignBottom: PropTypes.bool,
      rounding: PropTypes.bool
    })
  ]),
  layoutOnResize: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  layoutOnInit: PropTypes.bool,
  layoutDuration: PropTypes.number,
  layoutEasing: PropTypes.string,

  // Drag & Drop
  dragContainer: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  dragHandle: PropTypes.string,
  dragStartPredicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      distance: PropTypes.number,
      delay: PropTypes.number
    })
  ]),
  dragAxis: PropTypes.string,
  dragSort: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.exact({
      groupId: PropTypes.string
    })
  ]),
  dragSortHeuristics: PropTypes.exact({
    sortInterval: PropTypes.number,
    minDragDistance: PropTypes.number,
    minBounceBackAngle: PropTypes.number
  }),
  dragSortPredicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      action: PropTypes.string,
      migrateAction: PropTypes.string,
      threshold: PropTypes.number
    })
  ]),
  dragRelease: PropTypes.exact({
    duration: PropTypes.number,
    easing: PropTypes.string,
    useDragContainer: PropTypes.bool
  }),
  dragCssProps: PropTypes.exact({
    touchAction: PropTypes.string,
    userSelect: PropTypes.string,
    userDrag: PropTypes.string,
    tapHighlightColor: PropTypes.string,
    touchCallout: PropTypes.string,
    contentZooming: PropTypes.string
  }),
  dragPlaceholder: PropTypes.exact({
    enabled: PropTypes.bool,
    createElement: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func
  }),
  dragAutoScroll: PropTypes.exact({
    targets: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(
        PropTypes.exact({
          element: PropTypes.oneOfType([
            PropTypes.instanceOf(window.constructor),
            PropTypes.instanceOf(Element),
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
          ]),
          axis: PropTypes.number,
          priority: PropTypes.number,
          threshold: PropTypes.number
        })
      )
    ]),
    handle: PropTypes.func,
    threshold: PropTypes.number,
    safeZone: PropTypes.number,
    speed: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sortDuringScroll: PropTypes.bool,
    syncAfterScroll: PropTypes.bool,
    smoothStop: PropTypes.bool,
    onStart: PropTypes.func,
    onStop: PropTypes.func
  }),
  // Classnames
  containerClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemVisibleClass: PropTypes.string,
  itemHiddenClass: PropTypes.string,
  itemPositioningClass: PropTypes.string,
  itemDraggingClass: PropTypes.string,
  itemReleasingClass: PropTypes.string,
  itemPlaceholderClass: PropTypes.string
};

// Default props.
MuuriComponent.defaultProps = {
  ...Muuri.defaultOptions,
  gridProps: {},
  dragEnabled: null
};

// Display name.
MuuriComponent.displayName = "MuuriComponent";
