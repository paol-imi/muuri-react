import {useEffect} from 'react';
import {useItemContext} from '../contexts';
import {invariant} from '../invariant';
import {useRerender} from '../utils/hooks';

/**
 * The useDrag hook re-render item (in which the hook has been called)
 * Every time it is dragged/released.
 * The hook returns if the item is being dragged.
 *
 * @returns - If the item is being dragged.
 */
export function useDrag(): boolean {
  const {eventController} = useItemContext();
  const reRender = useRerender();

  // Check if the hook is called inside an item.
  invariant(
    eventController !== undefined,
    'The useDrag hook can be used only inside an Item'
  );

  // Enable the event.
  useEffect(() => {
    eventController.enableEvent('drag', reRender);
  }, [eventController, reRender]);

  return eventController.getPayload('drag') || false;
}
