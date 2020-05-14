/* React */
import React, {forwardRef, useEffect} from 'react';
import PropTypes from 'prop-types';
/* Muuri */
import Muuri from 'muuri';
/* Global map */
import {muuriMap} from '../muuri-map';
/* Component */
import {GridComponent} from './gridComponent';
/* Interfaces */
import type {DecoratedGrid, MuuriComponentProps} from '../interfaces';
/* Utils */
import {useInstantEffect, useMemoized} from '../utils/hooks';
import {addDecoration, removeDecorations} from '../utils/decorators';
import {
  getInstance,
  handleRef,
  setDragAutoScroll,
  setDragContainer,
  setDragSort,
  setDragStartPredicate,
} from '../utils/muuri';

// Muuri component.
export const MuuriComponent = forwardRef<DecoratedGrid, MuuriComponentProps>(
  function MuuriComponent(
    {
      /* GridComponent props. */
      children,
      id,
      groupIds,
      gridProps,
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
      /* Muuri options. */
      ...options
    },
    muuriRef
  ) {
    // Generate the Muuri instance.
    const grid = useMemoized(() => {
      // Remove the standard option '*'.
      // @ts-ignore
      options.items = [];
      // Muuri (0.9.0) generate the "ItemDrag" instances only if
      // drag is enabled. These instances do not handle scrolling well on touch devices,
      // so we only create these instances if drag-and-drop have to be used
      // (assuming that a boolean is passed to the prop instead of the default value "null").
      // The enabling / disabling of the drag is managed in dragStartPredicate.
      // @ts-ignore
      options.dragEnabled = dragEnabled !== null;

      // Allow the drag container to be a React.Ref<HTMLElement>.
      setDragContainer(options);
      // Allow the option to be an object ({ groupId }).
      setDragSort(options, muuriMap);
      // Allow the target elements to be React.Ref<HTMLElement>.
      setDragAutoScroll(options);
      // Allow enabling / disabling the drag-and-drop.
      setDragStartPredicate(options);

      // Generate the instance.
      const grid = getInstance(options);

      // Add the instance to the map.
      if (id) muuriMap.set(grid, id);
      // Add the decoration.
      addDecoration(grid, {id});
      // Set the ref.
      handleRef(muuriRef, grid);

      return grid;
    }); // eslint-disable-line

    // On unmount effect.
    useEffect(() => {
      // Clean-up.
      return () => {
        // Unset the ref.
        handleRef(muuriRef, null);
        // Remove the decorations.
        removeDecorations(grid);
        // Remove the instance from the map.
        if (id) muuriMap.delete(id);
        // Destroy the instace
        grid.destroy();
      };
    }, []); // eslint-disable-line

    // Allow the groupIds to be changed.
    useInstantEffect(() => {
      // decorate the instance
      addDecoration(grid, {groupIds});
      // Add the instance to the groups.
      if (groupIds) {
        groupIds.forEach((groupId) => {
          muuriMap.setGroup(grid, groupId);
        });
      }

      // Clean-up.
      return () => {
        // Remove the instance from the groups.
        if (groupIds) {
          groupIds.forEach((groupId) => {
            muuriMap.deleteGroup(grid, groupId);
          });
        }
      };
    }, groupIds || []);

    // Render.
    return (
      <GridComponent
        grid={grid}
        gridProps={gridProps}
        filter={filter}
        sort={sort}
        sortOptions={sortOptions}
        addOptions={addOptions}
        propsToData={propsToData}
        onSend={onSend}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onFilter={onFilter}
        onSort={onSort}
        onMount={onMount}
        onUnmount={onUnmount}
        forceSync={forceSync}
        dragFixed={dragFixed}
        dragEnabled={dragEnabled}
        instantLayout={instantLayout}>
        {children}
      </GridComponent>
    );
  }
);

// Proptypes.
MuuriComponent.propTypes = {
  id: PropTypes.string,
  groupIds: PropTypes.arrayOf(PropTypes.string.isRequired),
  showDuration: PropTypes.number,
  showEasing: PropTypes.string,
  hideDuration: PropTypes.number,
  hideEasing: PropTypes.string,
  visibleStyles: PropTypes.shape({}),
  hiddenStyles: PropTypes.shape({}),
  // @ts-ignore
  layout: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      fillGaps: PropTypes.bool,
      horizontal: PropTypes.bool,
      alignRight: PropTypes.bool,
      alignBottom: PropTypes.bool,
      rounding: PropTypes.bool,
    }),
  ]),
  layoutOnResize: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  layoutDuration: PropTypes.number,
  layoutEasing: PropTypes.string,
  dragContainer: PropTypes.oneOfType([
    PropTypes.instanceOf(HTMLElement),
    PropTypes.shape({
      current: PropTypes.instanceOf(HTMLElement).isRequired,
    }),
  ]),
  dragHandle: PropTypes.string,
  // @ts-ignore
  dragStartPredicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      distance: PropTypes.number,
      delay: PropTypes.number,
    }),
  ]),
  dragAxis: PropTypes.oneOf(['x', 'y', 'xy'] as const),
  dragSort: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.exact({
      groupId: PropTypes.string.isRequired,
    }),
  ]),
  // @ts-ignore
  dragSortHeuristics: PropTypes.exact({
    sortInterval: PropTypes.number,
    minDragDistance: PropTypes.number,
    minBounceBackAngle: PropTypes.number,
  }),
  // @ts-ignore
  dragSortPredicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.exact({
      action: PropTypes.oneOf(['move', 'swap'] as const),
      migrateAction: PropTypes.oneOf(['move', 'swap'] as const),
      threshold: PropTypes.number,
    }),
  ]),
  // @ts-ignore
  dragRelease: PropTypes.exact({
    duration: PropTypes.number,
    easing: PropTypes.string,
    useDragContainer: PropTypes.bool,
  }),
  // @ts-ignore
  dragCssProps: PropTypes.exact({
    touchAction: PropTypes.string,
    userSelect: PropTypes.string,
    userDrag: PropTypes.string,
    tapHighlightColor: PropTypes.string,
    touchCallout: PropTypes.string,
    contentZooming: PropTypes.string,
  }),
  // @ts-ignore
  dragPlaceholder: PropTypes.exact({
    enabled: PropTypes.bool,
    createElement: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
  }),
  // @ts-ignore
  dragAutoScroll: PropTypes.exact({
    targets: PropTypes.oneOfType([
      // @ts-ignore
      PropTypes.instanceOf(window.constructor),
      PropTypes.instanceOf(HTMLElement),
      PropTypes.shape({
        current: PropTypes.oneOfType([
          // @ts-ignore
          PropTypes.instanceOf(window.constructor),
          PropTypes.instanceOf(HTMLElement),
        ]),
      }),
      PropTypes.func,
      PropTypes.arrayOf(
        PropTypes.exact({
          element: PropTypes.oneOfType([
            // @ts-ignore
            PropTypes.instanceOf(window.constructor),
            PropTypes.instanceOf(HTMLElement),
            PropTypes.shape({
              current: PropTypes.oneOfType([
                // @ts-ignore
                PropTypes.instanceOf(window.constructor),
                PropTypes.instanceOf(HTMLElement),
              ]),
            }),
          ]).isRequired,
          axis: PropTypes.number,
          priority: PropTypes.number,
          threshold: PropTypes.number,
        }).isRequired
      ),
    ]).isRequired,
    handle: PropTypes.func,
    threshold: PropTypes.number,
    safeZone: PropTypes.number,
    speed: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sortDuringScroll: PropTypes.bool,
    syncAfterScroll: PropTypes.bool,
    smoothStop: PropTypes.bool,
    onStart: PropTypes.func,
    onStop: PropTypes.func,
  }),
  containerClass: PropTypes.string,
  itemClass: PropTypes.string,
  itemVisibleClass: PropTypes.string,
  itemHiddenClass: PropTypes.string,
  itemPositioningClass: PropTypes.string,
  itemDraggingClass: PropTypes.string,
  itemReleasingClass: PropTypes.string,
  itemPlaceholderClass: PropTypes.string,
};

// Default props.
MuuriComponent.defaultProps = {
  ...Muuri.defaultOptions,
  dragEnabled: null,
};

// Display name.
MuuriComponent.displayName = 'MuuriComponent';
