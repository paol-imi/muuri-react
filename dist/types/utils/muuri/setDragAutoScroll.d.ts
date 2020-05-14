import type { GridProps, DragAutoScrollTarget } from '../../interfaces';
/**
 * Wrap the 'dragAutoScroll' option.
 * Allow the target element to be a ref.
 *
 * @param options - The grid options.
 */
export declare function setDragAutoScroll(options: GridProps): void;
/**
 * Returns if the target is a valid element.
 *
 * @param element - The target.
 * @returns - If the target is a valid element.
 */
export declare function isTargetElement(target: DragAutoScrollTarget): boolean;
