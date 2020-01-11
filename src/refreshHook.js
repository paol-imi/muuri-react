import { useMemo, useEffect } from "react";
import { buildGlobal, hasConsumer, getConsumer } from "./global.js";
import { getChildren } from "./utils";

// Global
export const { useGlobalHook, getGlobal, hasGlobal } = buildGlobal(
  (muuriRef, children) => {
    // On mount generate the global instance
    const global = useMemo(() => new Global(), []);
    // On each render set the items and 
    // refresh all items requested
    useEffect(() => {
      global.setItems(muuriRef.current, children);
      global.refreshRequestedItems();
    });
    // return the global instance
    return global;
  }
);

// Global class
export class Global {
  constructor() {
    // Map<React.Children, DOMelement>
    this.itemsMap = new WeakMap();
    this.refreshRequests = [];
  }

  // Set items to the itemsMap
  setItems(muuri, children) {
    this.muuri = muuri;
    const items = getChildren(muuri.getElement());
    for (let i = 0; i < children.length; i++) {
      this.itemsMap.set(children[i], items[i]);
    }
  }

  // Add a refresh request
  addRefreshRequest(component) {
    this.refreshRequests.push(component);
  }

  // Refresh all items requested
  refreshRequestedItems() {
    this.refreshRequests.forEach(component => this.refresh(component));
    this.refreshRequests = [];
    this.muuri.layout();
  }

  // refresh a single item
  refreshItem(component) {
    this.refresh(component);
    this.muuri.layout();
  }

  // Refresh a muuri item
  refresh(component) {
    const item = this.itemsMap.get(component);
    if (item) {
      this.muuri.refreshItems([item]);
    }
  }
}

// Check that the hok is called inside a right component
function checkOnMounting() {
  if (!hasGlobal() || !hasConsumer()) {
    throw new Error(
      "This custom hook can be called only by a Component inside a MuuriComponent"
    );
  }
}

// (The identity of the setCount function is guaranteed to be stable so it’s safe to omit.)
export const useRefresh = deps => {
  // Memoize on mounting
  const [refresh, is] = useMemo(() => {
    checkOnMounting();

    // Get global reference
    const global = getGlobal();
    const consumer = getConsumer();

    // Refresh
    const refresh = () => {
      // If the component is rendering within the MuuriComponent
      // Check this to call muuri.layout() just one time
      if (hasGlobal()) {
        global.addRefreshRequest(consumer);
      } else {
        global.refreshItem(consumer);
      }
    };

    return [refresh, { mounting: true }];
  }, []);

  useEffect(() => {
    if (is.mounting) is.mounting = false;
    else refresh();
  }, deps);

  return refresh;
};
