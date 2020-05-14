import React from 'react';

// The theme context.
export const ThemeContext = React.createContext(null);

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

let uuid = 3;
// Generate 3 items.
export function generateItems() {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const color = oneOf(['green', 'blue']);

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const title = oneOf(alphabet) + oneOf(alphabet);
    const id = uuid++;

    items.push({id, color, title});
  }

  return items;
}
