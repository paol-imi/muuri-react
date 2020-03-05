// The purpose of this controller is to make possible
// to set data in the item also if
// it has not been created yet.
export class ItemRefController {
  constructor() {
    this._item = null;
    this._data = {};
  }

  // Set data in the item.
  set(key, value) {
    if (this.hasItem()) {
      this._item._component[key] = value;
    } else {
      this._data[key] = value;
    }
  }

  // Get data from the item.
  get(key) {
    if (this.hasItem()) {
      return this._item._component[key];
    } else {
      return this._data[key];
    }
  }

  // Set the item.
  setItem(item) {
    this._item = item;
    Object.assign(this._item._component, this._data);
    this._data = null;
  }

  // Get the item.
  getItem() {
    return this._item;
  }

  // If the item has been setted.
  hasItem() {
    return !!this._item;
  }
}
