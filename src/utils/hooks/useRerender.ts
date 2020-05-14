import {useState} from 'react';
import {useFunction} from './useFunction';

/**
 * Returns a (memoized) function to re-render
 * the component in which the hook has been called.
 *
 * @returns - The re-render method.
 */
export function useRerender(): () => void {
  const setState = useState<object>()[1];
  return useFunction<() => void>(() => {
    setState(Object.create(null));
  });
}
