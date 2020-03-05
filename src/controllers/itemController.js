export class ItemController {
  // Init.
  useInit() {
    this._requests = [];
  }

  // Emit the new items to the
  // components that made a request.
  emit(items) {
    for (let i = 0; i < this._requests.length; i++) {
      this._requests[i](items[i]);
    }
  }

  // Request an item.
  requestItem(cb) {
    return this._requests.push(cb);
  }
}
