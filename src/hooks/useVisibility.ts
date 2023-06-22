import {useItemContext, useGridContext} from '../contexts';
import {invariant} from '../invariant';
import {useFunction} from '../utils/hooks';

// The method returned by the hook.
export type SetVisibilityMethod = (
  visible: boolean,
  options?: UseVisibilityOptions
) => void;

// The options of the hook.
export type UseVisibilityOptions = {
  /** If the animation should be skipped. */
  instant?: boolean;
};

/**
 * The useVisibility hook allow you to show/hide the item in which the hook has been called.
 *
 * @returns - The setter method.
 */
export function useVisibility(): SetVisibilityMethod {
  const {layoutController} = useGridContext();
  const {eventController, itemRefController} = useItemContext();

  // Check if the hook is called inside an item.
  invariant(
    itemRefController !== undefined &&
      layoutController !== undefined &&
      eventController !== undefined,
    'The useVisibility hook can be used only inside an Item'
  );

  // Set visibility.
  const setVisibility = useFunction<SetVisibilityMethod>((visible, options) => {
    if (!itemRefController.hasItem()) return;
    if (!!visible === eventController.getPayload('show')) return;

    // Default options.
    options = options || useVisibility.defaultOptions;

    // Set the visibility.
    layoutController.setItemVisibility(
      itemRefController.getItem(),
      visible,
      options.instant === true
    );
  });

  return setVisibility;
}

// Default options.
useVisibility.defaultOptions = {instant: false};
