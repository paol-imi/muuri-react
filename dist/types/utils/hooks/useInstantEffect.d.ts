/**
 * Like useEffect but run instantly.
 *
 * @param didUpdate - The method to run.
 * @param deps - The dependecies.
 */
export declare function useInstantEffect(didUpdate: () => void | (() => void), deps: any[]): void;
