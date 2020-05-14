import {useItemContext} from '../contexts';
import {invariant} from '../invariant';
import {useFunction} from '../utils/hooks';

// The method return by the hook.
export type SetDataMethod = (data: object, options?: UseDataOptions) => void;

// The options of the hook and the method.
export type UseDataOptions = {
  /** If the data have to be merged with the old one. */
  merge?: boolean;
};

/**
 * The useData hook allow to set the data to the item in which the hook has been called.
 * It also returns the setter method.
 *
 * @param initialData - The data.
 * @param options - The options.
 * @returns - The setter method.
 */
export function useData(
  initialData?: object,
  options?: UseDataOptions
): SetDataMethod {
  const {itemRefController} = useItemContext();

  // Check if the hook is called inside an item.
  invariant(
    itemRefController !== undefined,
    'The useData hook can be used only inside an Item'
  );

  // Because of memoization, The identity of the function is guaranteed
  // to be stable so it will be safe to omit them as a dependency.
  const setData = useFunction<SetDataMethod>((data, options) => {
    // Check if the data is an object.
    invariant(
      typeof data === 'object',
      `The data must be an object, founded: ${typeof data}`
    );

    // Default options.
    options = options || useData.defaultOptions;
    // Set the data.
    if (options.merge) {
      // Merge.
      const currentData = itemRefController.get('data') || {};
      itemRefController.set('data', Object.assign(currentData, data));
    } else {
      // Set.
      itemRefController.set('data', data);
    }
  });

  // Set the inital data.
  if (typeof initialData === 'object') {
    setData(initialData, options);
  }

  return setData;
}

// Default options.
useData.defaultOptions = {merge: false};
