import {useCallback} from 'react';
import {AutoScroller, getResponsiveStyle, getStaticStyle} from 'muuri-react';

let uuid = 3;
// Generate n items.
export function generateItems(n) {
  const items = [];
  for (let i = 0; i < n; i++) {
    const color = oneOf(['orange', 'green', 'blue']);
    const key = `${uuid++}`;

    items.push({key, color});
  }

  return items;
}

// Return the 'onSend' method.
export function useSend(setItems) {
  return useCallback(
    ({key, fromId, toId}) => {
      // Sync the state with the items.
      setItems((items) => {
        const newItems = {...items};
        // The transferred item.
        const transferredItem = newItems[fromId].find(
          (item) => item.key === key
        );
        // Remove the item from the old category.
        newItems[fromId] = newItems[fromId].filter(
          (item) => item !== transferredItem
        );
        // Add the item in the new category.
        newItems[toId] = newItems[toId].concat(transferredItem);
        return newItems;
      });
    },
    [setItems]
  );
}

// Get the common layout options of the MuuriComponents.
export function getOptions(elementRef, secondaryRef, action) {
  return {
    // The groups of the MuuriComponent.
    groupIds: ['container'],
    // Items can be dragged and sorted only into
    // MuuriComponents of the "container" group.
    dragSort: {groupId: 'container'},
    // The item can only be dragged from the header.
    dragHandle: '.content-header',
    dragEnabled: true,
    dragContainer: document.body,
    dragAutoScroll: {
      targets: [
        // Scroll scrollElement (can be any scrollable element) on y-axis only.
        {
          element: elementRef,
          axis: AutoScroller.AXIS_Y,
        },
        {
          element: secondaryRef,
          axis: AutoScroller.AXIS_Y,
        },
      ],
    },
    dragSortHeuristics: {
      sortInterval: 0,
    },
    dragSortPredicate: {
      action,
    },
  };
}

// Return the dimensions of the item.
// This is done to allow us to use relative dimensions (e.g. "width: 50%")
// in the items and fix them during the drag (e.g. "width: 60px").
export function getDimensions(grid, id, isDragging) {
  // The Muuri component is virtually divided into 8 columns,
  // the width of the item will be 3 columns minus the margin.
  const columns = id === 'column' ? 1 / 1 : 1 / 3;
  // The margin of the item, can be any CSS values
  // valid for the margin expressed in "px" or "%".
  const margin = id === 'column' ? '10%' : '1.8%';
  // The width/height ratio. If you want to set a static
  // height just set it in the style and leave the "ratio" option empty.
  const ratio = id === 'column' ? 3 : 1.4;

  // If the item is dragging the style
  // must not be relative to the parent.
  return !isDragging
    ? getResponsiveStyle({columns, margin, ratio})
    : getStaticStyle({grid, columns, margin, ratio});
}

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}
