/**
 * Fill an Item (outer) element:
 * - style.position setted to "absolute".
 *
 * It also wrap the className setter to
 * avoid React to remove the standard classes
 * of Muuri from the item.
 *
 * @param itemElement - The item element to fill.
 * @param itemClasses - The Css classes of the items.
 */
export declare function fillItemElement(itemElement: HTMLElement, itemClasses: string[]): void;
