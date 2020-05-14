import {addDecoration} from '../decorators';
import type {DecoratedGrid} from '../../interfaces';

/**
 * Fill a grid instance:
 *  - Add the sizer element.
 *
 * @param grid - The Muuri instance.
 */
export function fillGrid(grid: DecoratedGrid): void {
  const sizerElement = document.createElement('div');

  // Keep the element hidden.
  sizerElement.style.visibility = 'hidden';
  sizerElement.style.position = 'absolute';
  // Add the class.
  sizerElement.classList.add('grid-sizer');

  // Set the element.
  addDecoration(grid, {sizerElement});
  const gridElement = grid.getElement();

  // Insert as first child.
  if (gridElement.children.length === 0) {
    gridElement.appendChild(sizerElement);
  } else {
    gridElement.insertBefore(sizerElement, gridElement.children[0]);
  }
}
