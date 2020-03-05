import { useEffect } from "react";

export class LayoutController {
  constructor(muuri) {
    this._muuri = muuri;
  }

  // Init.
  useInit() {
    this._itemsToRefresh = [];
    this._needLayout = false;
    this._isRendering = true;
    useEffect(() => {
      this._isRendering = false;
    });
  }

  // Refresh an item.
  refreshItem(item) {
    // If the component is rendering within the MuuriComponent.
    if (this._isRendering) {
      // The layout is managed by the MuuriComponent
      // (Performance purpose).
      this._itemsToRefresh.push(item);
      this._needLayout = true;
    } else {
      // The layout is managed here.
      this._muuri.refreshItems([item]);
      this._muuri.layout();
    }
  }

  // Show an item.
  setItemVisibility(item, visible, instant) {
    // Method to call.
    const method = visible ? "show" : "hide";
    // If the component is rendering within the MuuriComponent.
    if (this._isRendering) {
      // The layout is managed by the MuuriComponent
      // (Performance purpose).
      this._muuri[method]([item], { instant, layout: false });
      this._needLayout = true;
    } else {
      // The layout is managed here.
      this._muuri[method]([item], { instant });
    }
  }

  // Get the items that need to be refreshed.
  getItemsToRefresh() {
    return this._itemsToRefresh;
  }

  // If there are items to refresh.
  needRefresh() {
    return this._itemsToRefresh.length > 0;
  }

  // If a layout call is needed.
  needLayout() {
    return this._needLayout;
  }
}
