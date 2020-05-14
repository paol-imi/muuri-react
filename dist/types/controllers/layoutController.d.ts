import type { DecoratedItem } from '../interfaces';
/**
 * CONTROLLER: GRID -> ITEMCONTEXT
 *
 * The purpose of this controller is to synchronize the calculation
 * of the layout following changes that have occurred within an item.
 * If the GridComponent is re-rendering allow to calculate a
 * single layout and greatly optimize the performance.
 */
export declare class LayoutController {
    /** The items to refresh. */
    _itemsToRefresh: DecoratedItem[];
    /** The items to show. */
    _itemsToShow: DecoratedItem[];
    /** The items to hide. */
    _itemsToHide: DecoratedItem[];
    /** If the MuuriComponent parent is rendering. */
    _isRendering: boolean;
    /** Constructor. */
    constructor();
    /**
     * Init.
     */
    useInit(): void;
    /**
     * Refresh an item.
     *
     * @param item - The item to refresh.
     */
    refreshItem(item: DecoratedItem): void;
    /**
     * Set an item visibility.
     *
     * @param item - The item.
     * @param visible - The visibility.
     * @param instant - If the visibility change should happen without animations.
     */
    setItemVisibility(item: DecoratedItem, visible: boolean, instant: boolean): void;
    /**
     * Get the items that have to be refreshed.
     *
     * @returns - The items.
     */
    getItemsToRefresh(): DecoratedItem[];
    /**
     * Get the items that have to be shown.
     *
     * @returns - The items.
     */
    getItemsToShow(): DecoratedItem[];
    /**
     * Get the items that have to be hidden.
     *
     * @returns - The items.
     */
    getItemsToHide(): DecoratedItem[];
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
