import type { ReactElement, Key } from 'react';
/**
 * CONTROLLER: GRID
 *
 * The purpose of this controller is to manage children
 * during each render of the component, and provide
 * the indexes of the new children added.
 */
export declare class ChildrenController {
    /** The old children. */
    _oldChildrenArray: ReactElement[];
    /** The current children. */
    _children: ReactElement[];
    /** The indices of the last added children. */
    _indicesToAdd: number[];
    /** The number of the items being dragged. */
    _dragCounter: number;
    /**
     * Init all the settings given the new children.
     *
     * @param newChildren - the new children.
     */
    useInit(newChildren?: ReactElement[]): void;
    /**
     * Remove a child in the given position and return it.
     *
     * @param index - The index of the child to remove.
     * @returns - The removed child.
     */
    remove(index: number): ReactElement;
    /**
     * Append a child in the children array.
     *
     * @param child - The child to append.
     */
    append(child: ReactElement): void;
    /**
     * Returns the ordered array of indices of the added children.
     */
    getIndicesToAdd(): number[];
    /**
     * Map all the children.
     *
     * @param cb - The callback.
     * @returns - The mapped children.
     */
    render(cb: (child: ReactElement, key: Key) => ReactElement): ReactElement[];
    /**
     * Increment the drag counter.
     */
    incrementDragCounter(): void;
    /**
     * Decrement the drag counter.
     */
    decrementDragCounter(): void;
    /**
     * Remove the current children so they can be garbage collected.
     */
    flush(): void;
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
/**
 * Return an array of positions of the added children.
 * The algorithm is optimized for cases where the order of
 * the items does not change during re-renders (about 100% of cases).
 * The positions are in ascending order.
 *
 * @param newChildren - The new children.
 * @param oldChildren - The old children.
 * @return - The indices.
 */
export declare function getIndicesToAdd(newChildren: React.ReactElement[], oldChildren: React.ReactElement[]): number[];
