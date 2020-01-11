import { Children, useEffect } from "react";

const consumerId = "consumer-id";
const globalMap = new Map();

// Consumer getter/setter/has/delete
export function setConsumer(consumer) {
  return globalMap.set(consumerId, consumer === undefined ? null : consumer);
}
export function getConsumer() {
  return globalMap.get(consumerId);
}
export function hasConsumer() {
  return globalMap.get(consumerId) !== undefined;
}
export function deleteConsumer() {
  globalMap.delete(consumerId);
}

// Global getter/setter/has/delete
export function setGlobal(globalId, global) {
  return globalMap.set(globalId, global === undefined ? null : global);
}
export function getGlobal(globalId) {
  return globalMap.get(globalId);
}
export function hasGlobal(globalId) {
  return globalMap.get(globalId) !== undefined;
}
export function deleteGlobal(globalId) {
  globalMap.delete(globalId);
}

// Wrap a child component and set it as a consumer when 
// it is rendere within it's parent
export const ComponentWrapper = ({ children }) => {
  setConsumer(Children.only(children));
  return children;
};

// Build a that will be used by a parent component
export function buildGlobalHook(globalId, useGlobalFromArgs) {
  return function useGlobalHook() {
    setGlobal(globalId, useGlobalFromArgs(...arguments));
    useEffect(() => {
      deleteGlobal(globalId);
      deleteConsumer();
    });
    return getGlobal(globalId);
  };
}

// Build a global instance
export function buildGlobal(useGlobalFromArgs) {
  if (typeof useGlobalFromArgs !== "function") useGlobalFromArgs = _ => _;
  const globalId = getId();

  return {
    getGlobal: getGlobal.bind(null, globalId),
    hasGlobal: hasGlobal.bind(null, globalId),
    useGlobalHook: buildGlobalHook(globalId, useGlobalFromArgs)
  };
}

// Id generation
let uuid = 0;
function getId() {
  return (++uuid).toString();
}