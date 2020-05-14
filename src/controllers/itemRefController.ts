import {invariant} from '../invariant';
import {
  addDecoration,
  getDecoration,
  removeDecorations,
} from '../utils/decorators';
import type {DecoratedItem, ItemDecoration} from '../interfaces';

/*
 * CONTROLLER: ITEM
 *
 * The purpose of this controller is to make possible
 * to set data in the item also if
 * it has not been created yet.
 */
export class ItemRefController {
  /** The item. */
  _item: DecoratedItem | null = null;
  /** The temporary instance to hold the item's data. */
  _instance: Partial<ItemDecoration> = {};

  /**
   * Set a decoration in the item.
   *
   * @param key - The decoration key.
   * @param value - The decoration.
   */
  set<T extends keyof ItemDecoration>(key: T, value: ItemDecoration[T]): void {
    if (this._item) {
      addDecoration(this._item, {[key]: value});
    } else {
      this._instance[key] = value;
    }
  }

  /**
   * Get a decoration value from the item.
   *
   * @param key - The decoration key.
   * @returns - The decoration value.
   */
  get<T extends keyof ItemDecoration>(key: T): any {
    if (this._item) {
      return getDecoration(this._item)[key];
    } else {
      return this._instance[key];
    }
  }

  /**
   * Remove all the decorations from the item.
   */
  delete(): void {
    if (this._item) removeDecorations(this._item);
  }

  /**
   * Set the item in the controller.
   *
   * @param item - The item.
   */
  setItem(item: DecoratedItem): void {
    this._item = item;
    addDecoration(this._item, this._instance);
    this._instance = {};
  }

  /**
   * Item getter.
   *
   * @returns - The item.
   */
  getItem(): DecoratedItem {
    invariant(this._item !== null, 'The item has not been setted yet');
    return this._item;
  }

  /**
   * Returns if the item has been setted.
   *
   * @returns - If the item has been setted.
   */
  hasItem(): boolean {
    return this._item !== null;
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    this._item = null;
    this._instance = {};
  }
}
