import Muuri from 'muuri';
import type {DecoratedGrid} from '../../interfaces';

/**
 * Generate and returns a muuri instance with the given options.
 *
 * @param options - The options.
 * @returns - The muuri instance.
 */
export function getInstance(options: object): DecoratedGrid {
  const el = document.createElement('div');
  // The element won't be visible.
  el.style.display = 'none';
  // Muuri (0.8.0) need an element in the DOM to be instanciated.
  document.body.appendChild(el);

  // Generate the instance.
  const grid = new Muuri(el, options);

  // Remove the element.
  document.body.removeChild(el);

  return grid;
}
