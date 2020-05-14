import {useEffect} from 'react';
import {useItemContext} from '../contexts';
import {invariant} from '../invariant';
import {useRerender} from '../utils/hooks';

/**
 * The useShow hook allow you to know if the item is showing.
 * The item will re-render each time its visibility change.
 *
 * @returns - If the item is showing.
 */
export function useShow(): boolean | undefined {
  const {eventController} = useItemContext();
  const reRender = useRerender();

  // Check if the hook is called inside an item.
  invariant(
    eventController !== undefined,
    'The useShow hook can be used only inside an Item'
  );

  // Enable the event.
  useEffect(() => {
    eventController.enableEvent('show', reRender);
  }, [eventController, reRender]);

  return eventController.getPayload('show');
}
