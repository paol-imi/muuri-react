// class that links DOMItems and components
export class ItemsMap {
  constructor() {
    this.items = [];
    this.components = [];
  }

  add(components, items) {
    this.components = [...components];
    this.items = [...items];

    this.setItemsData();
  }

  setItemsData() {
    for (let i = 0; i < this.components.length; i++) {
      const { key, props } = this.components[i] || {};
      this.items[i]._component = { key, props };
    }
  }

  getItem(index) {
    return this.items[index];
  }

  getProps(index) {
    const component = this.components[index];
    return component && component.props;
  }
}
