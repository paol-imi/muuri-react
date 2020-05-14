import {useEffect, useRef} from 'react';
import {useReference} from './useReference';

/**
 * Like useEffect but run instantly.
 *
 * @param didUpdate - The method to run.
 * @param deps - The dependecies.
 */
export function useInstantEffect(
  didUpdate: () => void | (() => void),
  deps: any[]
): void {
  // Deps check.
  const needUpdate = useReference(deps);
  const cleanUpRef = useRef<(() => void) | void>();

  // Run.
  if (needUpdate) {
    if (cleanUpRef.current) cleanUpRef.current();
    cleanUpRef.current = didUpdate();
  }

  // Catch unmount.
  useEffect(() => {
    return () => {
      if (cleanUpRef.current) cleanUpRef.current();
    };
  }, []);
}
