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
  dragEnabled: PropTypes.bool,
  dragContainer: PropTypes.instanceOf(Element),
  dragStartPredicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      distance: PropTypes.number,
      delay: PropTypes.number,
      handle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
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
    PropTypes.exact({ action: PropTypes.string, threshold: PropTypes.number })
  ]),
  dragReleaseDuration: PropTypes.number,
  dragReleaseEasing: PropTypes.string,
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
    duration: PropTypes.number,
    easing: PropTypes.string,
    createElement: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func
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
  gridProps: {},

  // Default show animation
  showDuration: 300,
  showEasing: "ease",

  // Default hide animation
  hideDuration: 300,
  hideEasing: "ease",

  // Item's visible/hidden state styles
  visibleStyles: {
    opacity: "1",
    transform: "scale(1)"
  },
  hiddenStyles: {
    opacity: "0",
    transform: "scale(0.5)"
  },

  // Layout
  layout: {
    fillGaps: false,
    horizontal: false,
    alignRight: false,
    alignBottom: false,
    rounding: true
  },
  layoutOnResize: 100,
  layoutOnInit: true,
  layoutDuration: 300,
  layoutEasing: "ease",

  // Sorting
  sortData: null,

  // Drag & Drop
  dragEnabled: false,
  dragContainer: null,
  dragStartPredicate: {
    distance: 0,
    delay: 0,
    handle: false
  },
  dragAxis: null,
  dragSort: true,
  dragSortHeuristics: {
    sortInterval: 100,
    minDragDistance: 10,
    minBounceBackAngle: 1
  },
  dragSortPredicate: {
    threshold: 50,
    action: "move"
  },
  dragReleaseDuration: 300,
  dragReleaseEasing: "ease",
  dragCssProps: {
    touchAction: "none",
    userSelect: "none",
    userDrag: "none",
    tapHighlightColor: "rgba(0, 0, 0, 0)",
    touchCallout: "none",
    contentZooming: "none"
  },
  dragPlaceholder: {
    enabled: false,
    duration: 300,
    easing: "ease",
    createElement: null,
    onCreate: null,
    onRemove: null
  },

  // Classnames
  containerClass: "muuri",
  itemClass: "muuri-item",
  itemVisibleClass: "muuri-item-shown",
  itemHiddenClass: "muuri-item-hidden",
  itemPositioningClass: "muuri-item-positioning",
  itemDraggingClass: "muuri-item-dragging",
  itemReleasingClass: "muuri-item-releasing",
  itemPlaceholderClass: "muuri-item-placeholder"
};

// Display name.
MuuriComponent.displayName = "MuuriComponent";
