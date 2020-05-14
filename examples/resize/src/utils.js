// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 7; i++) {
    const color = oneOf(['orange', 'green', 'blue']);
    const id = uuid++;

    items.push({id, color});
  }

  return items;
}
