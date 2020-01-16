// class that links DOMItems and components
export class ItemsMap {
  constructor() {
    this.DOMItems = [];
    this.components = [];
  }

  add(components, DOMItems) {
    this.components = [...components];
    this.DOMItems = [...DOMItems];
  }

  getDOMItem(index) {
    return this.DOMItems[index];
  }

  getProps(index) {
    const component = this.components[index];
    return component && component.props;
  }

  getPropsFromDOMItem(DOMItem) {
    const index = this.DOMItems.indexOf(DOMItem);
    if (index > -1) return this.getProps(index);
  }
}
