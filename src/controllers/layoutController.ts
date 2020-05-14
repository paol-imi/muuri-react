import {useEffect} from 'react';
import type {DecoratedItem} from '../interfaces';

/**
 * CONTROLLER: GRID -> ITEMCONTEXT
 *
 * The purpose of this controller is to synchronize the calculation
 * of the layout following changes that have occurred within an item.
 * If the GridComponent is re-rendering allow to calculate a
 * single layout and greatly optimize the performance.
 */
export class LayoutController {
  /** The items to refresh. */
  _itemsToRefresh: DecoratedItem[];
  /** The items to show. */
  _itemsToShow: DecoratedItem[];
  /** The items to hide. */
  _itemsToHide: DecoratedItem[];
  /** If the MuuriComponent parent is rendering. */
  _isRendering: boolean;

  /** Constructor. */
  constructor() {
    this._itemsToRefresh = [];
    this._itemsToShow = [];
    this._itemsToHide = [];
    this._isRendering = false;
  }

  /**
   * Init.
   */
  useInit(): void {
    // Items.
    this._itemsToRefresh = [];
    this._itemsToShow = [];
    this._itemsToHide = [];
    // State.
    this._isRendering = true;
    // Change state.
    // eslint-disable-next-line
    useEffect(() => {
      this._isRendering = false;
    });
  }

  /**
   * Refresh an item.
   *
   * @param item - The item to refresh.
   */
  refreshItem(item: DecoratedItem): void {
    // If the component is rendering within the MuuriComponent.
    if (this._isRendering) {
      // The layout is managed by the MuuriComponent
      // (Performance purpose).
      this._itemsToRefresh.push(item);
    } else {
      // If the item is changing parent this
      // will get the right parent.
      const grid = item.getGrid();
      // The layout is managed here.
      grid.refreshItems([item]);
      grid.layout();
    }
  }

  /**
   * Set an item visibility.
   *
   * @param item - The item.
   * @param visible - The visibility.
   * @param instant - If the visibility change should happen without animations.
   */
  setItemVisibility(
    item: DecoratedItem,
    visible: boolean,
    instant: boolean
  ): void {
    // If the component is rendering within the MuuriComponent.
    if (this._isRendering) {
      // The layout is managed by the MuuriComponent
      // (Performance purpose).
      if (visible) this._itemsToShow.push(item);
      else this._itemsToHide.push(item);
    } else {
      // If the item is changing parent this
      // will get the right parent.
      const grid = item.getGrid();
      // The layout is managed here.
      if (visible) grid.show([item], {instant});
      else grid.hide([item], {instant});
    }
  }

  /**
   * Get the items that have to be refreshed.
   *
   * @returns - The items.
   */
  getItemsToRefresh(): DecoratedItem[] {
    return this._itemsToRefresh;
  }

  /**
   * Get the items that have to be shown.
   *
   * @returns - The items.
   */
  getItemsToShow(): DecoratedItem[] {
    return this._itemsToShow;
  }

  /**
   * Get the items that have to be hidden.
   *
   * @returns - The items.
   */
  getItemsToHide(): DecoratedItem[] {
    return this._itemsToHide;
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    this._itemsToRefresh = [];
    this._itemsToShow = [];
    this._itemsToHide = [];
  }
}
