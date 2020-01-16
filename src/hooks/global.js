import { useEffect, useMemo } from "react";
import uuid from "../utils/uuid";

const consumers = [];
const globalMap = new Map();

// Consumer getter/setter/has/delete
export function setConsumer(consumer) {
  return consumers.unshift(consumer === undefined ? null : consumer);
}
export function getConsumer() {
  return consumers[0];
}
export function hasConsumer() {
  return consumers.length !== 0;
}
export function deleteConsumer() {
  return consumers.shift();
}
export function deleteAllConsumer() {
  consumers.length = 0;
}
export function getConsumersNumber() {
  return consumers.length;
}

// Global getter/setter/has/delete
export function setGlobal(globalId, global) {
  return globalMap.get(globalId).unshift(global === undefined ? null : global);
}
export function getGlobal(globalId) {
  return globalMap.get(globalId)[0];
}
export function hasGlobal(globalId) {
  return globalMap.get(globalId).length !== 0;
}
export function deleteGlobal(globalId) {
  return globalMap.get(globalId).shift();
}

// Build a that will be used by a parent component
export function useGlobalHook(globalId, useGlobalFromArgs, ...args) {
  setGlobal(globalId, useGlobalFromArgs(...args));
  useEffect(() => {
    deleteGlobal(globalId);
  });
  return getGlobal(globalId);
}
export function useGlobalReference(globalId) {
  const memo = useMemo(() => ({}), []);
  if (hasGlobal(globalId)) memo.global = getGlobal(globalId);
  return memo;
}
export function useConsumerReference() {
  const memo = useMemo(() => ({}), []);
  if (hasConsumer()) memo.consumer = getConsumer();
  return memo;
}

// Build a global instance
export function buildGlobal(useGlobalFromArgs) {
  if (typeof useGlobalFromArgs !== "function") useGlobalFromArgs = _ => _;
  const globalId = uuid();
  globalMap.set(globalId, []);

  return {
    setGlobal: setGlobal.bind(null, globalId),
    getGlobal: getGlobal.bind(null, globalId),
    hasGlobal: hasGlobal.bind(null, globalId),
    useGlobalHook: useGlobalHook.bind(null, globalId, useGlobalFromArgs),
    useGlobalReference: useGlobalReference.bind(null, globalId)
  };
}
