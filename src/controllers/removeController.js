export class RemoveController {
  // Init.
  useInit() {
    this._itemsToRemove = [];
  }

  // Request an item to be removed.
  removeItem(item) {
    this._itemsToRemove.push(item);
  }

  // Return all the items to remove.
  getItemsToRemove() {
    return this._itemsToRemove;
  }
}
