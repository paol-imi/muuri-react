import type { DecoratedItem } from '../interfaces';
/**
 * CONTROLLER: GRID -> ITEM
 *
 * The purpose of this controller is to pass to the
 * ItemComponents the items instances.
 * This can be done without knowing the added items and
 * relying only on the useEffect call order of the added items.
 */
export declare class ItemAddController {
    /** The ItemComponents requests. */
    _requests: ((item: DecoratedItem) => void)[];
    /**
     * Clear the requests.
     */
    useInit(): void;
    /**
     * Emit the new items to the
     * components that made a request.
     *
     * @param items - The items.
     */
    emit(items: DecoratedItem[]): void;
    /**
     * Request an item.
     *
     * @param cb - The callback.
     */
    requestItem(cb: (item: DecoratedItem) => void): void;
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
