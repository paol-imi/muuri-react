// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 6; i++) {
    const color = oneOf(['red', 'green', 'blue']);
    const width = oneOf([1, 2]);
    const height = oneOf([1, 2]);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const title = oneOf(alphabet) + oneOf(alphabet);
    const id = uuid++;

    items.push({id, color, width, height, title});
  }

  return items;
}

// Grid static options.
export const options = {
  dragSortHeuristics: {
    sortInterval: 70,
  },
  dragContainer: document.body,
  // The placeholder of an item that is being dragged.
  dragPlaceholder: {
    enabled: true,
    createElement: function (item) {
      // The element will have the Css class ".muuri-item-placeholder".
      return item.getElement().cloneNode(true);
    },
  },
};
