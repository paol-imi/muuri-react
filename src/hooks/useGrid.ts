import {useEffect} from 'react';
import {useGridContext, useItemContext} from '../contexts';
import {invariant} from '../invariant';
import {useRerender} from '../utils/hooks';
import type {DecoratedGrid} from '../interfaces';

// The data returned by the hook.
export type GridData = {
  id?: string;
  groupIds?: string[];
  grid: DecoratedGrid;
};

/**
 * The useGrid hook return the data of the MuuriComponent parent of the
 * item (in which the hook has been called).
 *
 * @returns - The data of the MuuriComponent.
 */
export function useGrid(): GridData {
  const {eventController} = useItemContext();
  const gridContext = useGridContext();
  const reRender = useRerender();

  // Check if the hook is called inside an item.
  invariant(
    eventController !== undefined && gridContext.grid !== undefined,
    'The useGrid hook can be used only inside an Item'
  );

  // The context is not updated when the hook is trigger
  // so we need to get the updated instance from the eventController.
  const grid = eventController.getPayload('send') || gridContext.grid;

  // Enable the event.
  useEffect(() => {
    eventController.enableEvent('send', reRender);
  }, [eventController, reRender]);

  return {
    id: grid._component.id,
    groupIds: grid._component.groupIds,
    grid,
  };
}
