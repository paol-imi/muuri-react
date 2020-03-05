import React from "react";
import * as hooks from "../hooks";

// Hook names.
const hooksNames = [
  "useData",
  "useDrag",
  "useGrid",
  "useRefresh",
  "useShow",
  "useVisibility"
];

// Hook handlers.
const HooksHandlers = [
  ["useData", payload => ({ setData: payload })],
  ["useDrag", payload => ({ isDragging: payload })],
  ["useGrid", payload => payload], // { muuri, id, groupIds }
  ["useRefresh", payload => ({ refresh: payload })],
  ["useShow", payload => ({ isShowing: payload })],
  ["useVisibility", payload => ({ setVisibility: payload })]
];

// Run all the handlers and merge all the payloads.
function getMerged(hooksHandlers) {
  return Object.assign(
    {},
    ...hooksHandlers.map(([hookName, handler]) => {
      const payload = hooks[hookName]();
      return handler(payload);
    })
  );
}

// Item HOC.
export function withHook(Component, enabledHooks) {
  // There must be an array of hooks to enable.
  if (!Array.isArray(enabledHooks)) {
    throw new TypeError(
      "An array of hooks name must be provided to wrap an item."
    );
  }

  // All the hooks must be valid.
  enabledHooks.forEach(hookName => {
    if (!hooksNames.includes(hookName)) {
      throw new TypeError("Invalid hook: ", hookName);
    }
  });

  // There must be at least one hook to enable.
  if (enabledHooks.length === 0) {
    throw new TypeError("To wrap an item at least one hook must be provided.");
  }

  // Get the handlers array of the enabled hook.
  const hooksHandlers = HooksHandlers.filter(([hookName]) =>
    enabledHooks.includes(hookName)
  );

  // Return the HOC.
  return function WrappedItem(props) {
    // The hooks will run in the 'getMerged' method.
    return <Component {...props} {...getMerged(hooksHandlers)} />;
  };
}
