import type { DecoratedItem } from "../interfaces";
/**
 * CONTROLLER: GRID -> ITEM
 *
 * The purpose of this controller is to find the items to remove
 * based only on the unmount of the ItemComponents.
 */
export declare class ItemRemoveController {
    /** The items to remove. */
    _itemsToRemove: DecoratedItem[];
    /**
     * Initialize.
     */
    useInit(): void;
    /**
     * Request an item to be removed.
     *
     * @param item - The item to be removed.
     */
    removeItem(item: DecoratedItem): void;
    /**
     * Return all the items to remove.
     */
    getItemsToRemove(): DecoratedItem[];
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
