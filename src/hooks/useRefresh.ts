import {useEffect, useCallback} from 'react';
import {useGridContext, useItemContext} from '../contexts';
import {invariant} from '../invariant';

// The method returned by the hook.
export type RefreshMethod = () => void;

/**
 * The useRefresh hook allow to notify the MuuriComponent that the
 * item dimensions are changed, so that it can update the layout.
 *
 * @param deps - The dependencies.
 * @returns - The refresh method.
 */
export function useRefresh(deps: any[] = []): RefreshMethod {
  const {layoutController} = useGridContext();
  const {itemRefController} = useItemContext();

  // Check if the hook is called inside an item.
  invariant(
    itemRefController !== undefined && layoutController !== undefined,
    'The useRefresh hook can be used only inside an Item'
  );

  // Because of memoization, The identity of the function is guaranteed
  // to be stable so it will be safe to omit it as a dependency.
  const refresh = useCallback(() => {
    if (!itemRefController.hasItem()) return;
    // Get the item.
    const item = itemRefController.getItem();
    // If the component is rendering within the MuuriComponent.
    layoutController.refreshItem(item);
  }, [layoutController, itemRefController]);

  useEffect(() => {
    refresh();
  }, deps.concat(refresh)); // eslint-disable-line

  return refresh;
}
