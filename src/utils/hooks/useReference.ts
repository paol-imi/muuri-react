import {useRef} from 'react';

/**
 * Accept a dependencyList and return if it has changed from
 * the previous render.
 *
 * @param dependencyList - The dependencyList.
 * @returns - If the dependencyList is changed from the previous render.
 */
export function useReference(dependencyList: any[]): boolean {
  const ref = useRef<any[]>(dependencyList);

  // If it is the first call return true.
  if (ref.current === dependencyList) return true;

  // Compare the dependencyLists.
  const didUpdate = compare(ref.current, dependencyList);
  // Keep the reference of the new one.
  ref.current = dependencyList;

  return didUpdate;
}

/**
 * Compare two dependencyLists and return if they are different.
 *
 * @param a - The first dependencyList to compare.
 * @param b - The second dependencyList to compare.
 * @returns - If the 2 dependencyLists are different.
 */
function compare(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return true;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return true;
  }

  return false;
}
