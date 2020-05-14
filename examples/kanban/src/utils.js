import {useCallback} from 'react';

// Return the 'onSend' method.
export function useSend(setItems) {
  return useCallback(({key, fromId, toId}) => {
    // The id of the MuuriComponent that is sending the item.
    fromId = fromId.toLowerCase();
    // The id of the MuuriComponent that is receiving the item.
    toId = toId.toLowerCase();

    // Sync the state with the items.
    setItems((items) => {
      const newItems = {...items};
      // Remove the item from the old category.
      newItems[fromId] = newItems[fromId].filter((item) => item !== key);
      // Add the item in the new category.
      newItems[toId] = newItems[toId].concat(key);
      return newItems;
    });
  }, []); // eslint-disable-line
}

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

// Return a random word.
export function getRandomWord() {
  return (
    oneOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + oneOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  );
}

// Board static options.
export const boardOptions = {
  containerClass: 'board',
  layoutDuration: 400,
  dragEnabled: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  // It's possible to drag the column only
  // by clicking on the header.
  dragHandle: '.board-column-header',
};

// Column static options.
export const columnOptions = {
  // Enable to send the items in
  // the grids with the following groupId.
  dragSort: {groupId: 'NOTES'},
  groupIds: ['NOTES'],
  containerClass: 'board-column-content',
  dragEnabled: true,
  dragFixed: true,
  dragSortHeuristics: {
    sortInterval: 0,
  },
  dragContainer: document.body,
};
