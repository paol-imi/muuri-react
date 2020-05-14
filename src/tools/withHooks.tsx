import React from 'react';
import type {ComponentType} from 'react';
import * as hooks from '../hooks';
import {invariant} from '../invariant';

// Hook names.
const hooksNames = [
  'useData',
  'useDrag',
  'useDraggable',
  'useGrid',
  'useRefresh',
  'useShow',
  'useVisibility',
] as const;

// Handler type.
type HookHandlerType = [
  typeof hooksNames[number],
  <T>(t: T) => {[x: string]: T}
];

// Hook handlers.
const HooksHandlers: HookHandlerType[] = [
  ['useData', /*       */ getHandler('setData')],
  ['useDrag', /*       */ getHandler('isDragging')],
  ['useDraggable', /*  */ getHandler('setDraggable')],
  ['useGrid', /*       */ getHandler('gridData')],
  ['useRefresh', /*    */ getHandler('refresh')],
  ['useShow', /*       */ getHandler('isShowing')],
  ['useVisibility', /* */ getHandler('setVisibility')],
];

/**
 * Return the handler with the given key.
 *
 * @param key - The key.
 * @returns - The method.
 */
export function getHandler(key: string): <T>(t: T) => {[x: string]: T} {
  return function handler<T>(payload: T) {
    return {[key]: payload};
  };
}

/**
 * Run all the handlers and merge all the payloads.
 *
 * @param hooksHandlers - The handlers.
 * @returns - The merged payload.
 */
function getMerged(hooksHandlers: HookHandlerType[]): object {
  return Object.assign(
    {},
    ...hooksHandlers.map(([hookName, handler]) => {
      const payload = hooks[hookName]();
      return handler(payload);
    })
  );
}

/**
 * Item HOC for hooks.
 *
 * @param Component - The component to wrap.
 * @param enabledHooks - The hooks to enable.
 * @returns - The wrapped component.
 */
export function withHooks<T extends object>(
  Component: ComponentType<T>,
  enabledHooks: typeof hooksNames[number][]
) {
  // There must be an array of hooks to enable.
  invariant(
    Array.isArray(enabledHooks),
    'An array of hooks name must be provided to wrap an item.'
  );

  // All the hooks must be valid.
  enabledHooks.forEach((hookName) => {
    invariant(hooksNames.includes(hookName), `Invalid item hook: ${hookName}`);
  });

  // There must be at least one hook to enable.
  invariant(
    enabledHooks.length !== 0,
    'To wrap an item at least one hook must be provided.'
  );

  // Get the handlers array of the enabled hook.
  const hooksHandlers = HooksHandlers.filter(([hookName]) =>
    enabledHooks.includes(hookName)
  );

  // Return the HOC.
  return function WrappedItem(props: T) {
    // The hooks will run in the 'getMerged' method.
    return <Component {...(props as T)} {...getMerged(hooksHandlers)} />;
  };
}
