import type {DecoratedItem} from '../../interfaces';
import {addDecoration} from '../decorators';

/**
 * Fill an item:
 * - Add the _component decoration.
 * - Re-define the _sortData property.
 *
 * @param item - The item to fill.
 */
export function fillItem(item: DecoratedItem): void {
  addDecoration(item, {props: {}, data: {}});
  // Change the sort data.
  Object.defineProperty(item, '_sortData', {
    get() {
      return this.getData();
    },
    set() {
      // nothing to do here.
    },
  });
}
