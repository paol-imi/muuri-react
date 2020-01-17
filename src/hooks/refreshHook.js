import { useMemo, useEffect } from "react";
import { buildGlobal, hasConsumer, useConsumerReference } from "./global";

// Global
export const { useGlobalHook, getGlobal, hasGlobal } = buildGlobal(
  (muuriRef, itemsMap) => {
    // On mount generate the global instance
    const global = useMemo(() => new Global(itemsMap), []); // eslint-disable-line
    // Set the muuri instance
    useEffect(() => global.setMuuri(muuriRef.current), []); // eslint-disable-line
    // On each render set the items and
    // refresh all items requested
    useEffect(() => global.refreshRequestedItems());
    // return the global instance
    return global;
  }
);

// Global class
export class Global {
  constructor(itemsMap) {
    this.itemsMap = itemsMap;
    this.refreshRequests = [];
  }

  setMuuri(muuri) {
    this.muuri = muuri;
  }

  // Add a refresh request
  addRefreshRequest(index) {
    this.refreshRequests.push(index);
  }

  // Refresh all items requested
  refreshRequestedItems() {
    if (this.refreshRequests.length !== 0) {
      this.muuri.refreshItems(
        this.refreshRequests.map(index => this.itemsMap.getItem(index))
      );
      this.refreshRequests = [];
      this.muuri.layout();
    }
  }

  // refresh a single item
  refreshItem(index) {
    this.muuri.refreshItems([this.itemsMap.getItem(index)]);
    this.muuri.layout();
  }
}

// Check that the hok is called inside a right component
export function checkOnMounting() {
  if (!hasGlobal() || !hasConsumer()) {
    throw new Error(
      "This custom hook can be called only by a Component inside a MuuriComponent."
    );
  }
}

// (The identity of the refresh function is guaranteed to be stable so it is safe to omit.)
export function useRefresh(deps) {
  // Store
  const memo = useConsumerReference();
  // Memoize on mounting
  const [refresh, is] = useMemo(() => {
    checkOnMounting();
    // We are sure that global doesn't change until unmounting
    // And ther's no need to use 'UseGlobalReference'
    const global = getGlobal();

    // Refresh
    const refresh = () => {
      // If the component is rendering within the MuuriComponent
      // Check this to call muuri.layout() just one time

      if (hasGlobal()) {
        global.addRefreshRequest(memo.consumer);
      } else {
        global.refreshItem(memo.consumer);
      }
    };

    return [refresh, { mounting: true }];
  }, []); // eslint-disable-line

  useEffect(() => {
    if (is.mounting) is.mounting = false;
    else refresh();
  }, deps); // eslint-disable-line

  return refresh;
}
