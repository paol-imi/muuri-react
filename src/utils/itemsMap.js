// Class that links items and components
export class ItemsMap {
  constructor() {
    this.items = [];
    this.components = [];
  }

  add(components, items) {
    this.components = [...components];
    this.items = [...items];
  }

  getItem(index) {
    return this.items[index];
  }
}
