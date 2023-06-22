import {useItemContext} from '../contexts';
import {invariant} from '../invariant';
import {useFunction} from '../utils/hooks';

// The method returned by the hook.
export type SetDraggableMethod = (draggable: boolean) => void;

/**
 * The useDraggable hook allow to decide if the item (in which the hook has been called)
 * can be dragged or not.
 * It returns the setter method.
 *
 * @returns - The setter method.
 */
export function useDraggable(): SetDraggableMethod {
  const {itemRefController} = useItemContext();

  // Check if the hook is called inside an item.
  invariant(
    itemRefController !== undefined,
    'The useDraggable hook can be used only inside an Item'
  );

  const setDraggable = useFunction<SetDraggableMethod>((draggable) => {
    // Set if the item can be dragged.
    itemRefController.set('draggable', !!draggable);
  });

  return setDraggable;
}
