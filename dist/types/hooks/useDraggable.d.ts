export type SetDraggableMethod = (draggable: boolean) => void;
/**
 * The useDraggable hook allow to decide if the item (in which the hook has been called)
 * can be dragged or not.
 * It returns the setter method.
 *
 * @returns - The setter method.
 */
export declare function useDraggable(): SetDraggableMethod;
