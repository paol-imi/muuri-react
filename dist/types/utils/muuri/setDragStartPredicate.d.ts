import type { GridProps } from '../../interfaces';
/**
 * Wrap the 'dragStartPredicate' option.
 * To allow the drag:
 * - The global drag must be enabled.
 * - The item must be draggable.
 *
 * @param options - The grid options.
 */
export declare function setDragStartPredicate(options: GridProps): void;
