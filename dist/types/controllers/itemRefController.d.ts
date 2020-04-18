import type { DecoratedItem, ItemDecoration } from "../interfaces";
export declare class ItemRefController {
    /** The item. */
    _item: DecoratedItem | null;
    /** The temporary instance to hold the item's data. */
    _instance: Partial<ItemDecoration>;
    /**
     * Set a decoration in the item.
     *
     * @param key - The decoration key.
     * @param value - The decoration.
     */
    set<T extends keyof ItemDecoration>(key: T, value: ItemDecoration[T]): void;
    /**
     * Get a decoration value from the item.
     *
     * @param key - The decoration key.
     * @returns - The decoration value.
     */
    get<T extends keyof ItemDecoration>(key: T): any;
    /**
     * Remove all the decorations from the item.
     */
    delete(): void;
    /**
     * Set the item in the controller.
     *
     * @param item - The item.
     */
    setItem(item: DecoratedItem): void;
    /**
     * Item getter.
     *
     * @returns - The item.
     */
    getItem(): DecoratedItem;
    /**
     * Returns if the item has been setted.
     *
     * @returns - If the item has been setted.
     */
    hasItem(): boolean;
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
