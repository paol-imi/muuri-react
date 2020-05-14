import type {DecoratedItem} from '../interfaces';

/**
 * CONTROLLER: GRID -> ITEM
 *
 * The purpose of this controller is to pass to the
 * ItemComponents the items instances.
 * This can be done without knowing the added items and
 * relying only on the useEffect call order of the added items.
 */
export class ItemAddController {
  /** The ItemComponents requests. */
  _requests: ((item: DecoratedItem) => void)[] = [];

  /**
   * Clear the requests.
   */
  useInit(): void {
    this._requests = [];
  }

  /**
   * Emit the new items to the
   * components that made a request.
   *
   * @param items - The items.
   */
  emit(items: DecoratedItem[]): void {
    for (let i = 0; i < this._requests.length; i++) {
      this._requests[i](items[i]);
    }
  }

  /**
   * Request an item.
   *
   * @param cb - The callback.
   */
  requestItem(cb: (item: DecoratedItem) => void): void {
    this._requests.push(cb);
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    this._requests = [];
  }
}
