import type { ComponentType } from 'react';
declare const hooksNames: readonly ["useData", "useDrag", "useDraggable", "useGrid", "useRefresh", "useShow", "useVisibility"];
/**
 * Return the handler with the given key.
 *
 * @param key - The key.
 * @returns - The method.
 */
export declare function getHandler(key: string): <T>(t: T) => {
    [x: string]: T;
};
/**
 * Item HOC for hooks.
 *
 * @param Component - The component to wrap.
 * @param enabledHooks - The hooks to enable.
 * @returns - The wrapped component.
 */
export declare function withHooks<T extends object>(Component: ComponentType<T>, enabledHooks: typeof hooksNames[number][]): (props: T) => JSX.Element;
export {};
