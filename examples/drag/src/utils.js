// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 10; i++) {
    const color = oneOf(["green", "blue"]);
    const width = oneOf([2]);
    const height = oneOf([1, 2]);

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const title = oneOf(alphabet) + oneOf(alphabet);
    const id = uuid++;

    items.push({ id, color, width, height, title });
  }

  return items;
}
