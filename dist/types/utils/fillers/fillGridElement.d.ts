/**
 * Fill a grid element:
 * - If it is not position the style.position is setted to "relative".
 * - The CSS "containerClass" is added.
 *
 * It also wrap the className setter to
 * avoid React to remove the standard class
 * of Muuri from the grid.
 *
 * @param gridElement - The element to fill.
 * @param gridClass - The Css class of the grid element.
 */
export declare function fillGridElement(gridElement: HTMLElement, gridClass: string): void;
