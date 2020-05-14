import type {DecoratedItem} from '../interfaces';

/**
 * CONTROLLER: GRID -> ITEM
 *
 * The purpose of this controller is to find the items to remove
 * based only on the unmount of the ItemComponents.
 */
export class ItemRemoveController {
  /** The items to remove. */
  _itemsToRemove: DecoratedItem[] = [];

  /**
   * Initialize.
   */
  useInit(): void {
    this._itemsToRemove = [];
  }

  /**
   * Request an item to be removed.
   *
   * @param item - The item to be removed.
   */
  removeItem(item: DecoratedItem): void {
    this._itemsToRemove.push(item);
  }

  /**
   * Return all the items to remove.
   */
  getItemsToRemove(): DecoratedItem[] {
    return this._itemsToRemove;
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    this._itemsToRemove = [];
  }
}
