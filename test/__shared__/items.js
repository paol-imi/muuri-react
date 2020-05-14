export class DOMItems {
  constructor(grid) {
    this.grid = grid;
  }

  at(index) {
    return this.grid.getElement().children[index];
  }

  findById(id) {
    return Array.from(this.grid.getElement().children).find(
      (element) => element.getAttribute('id') === id
    );
  }

  map(cb) {
    return Array.from(this.grid.getElement().children).slice(1).map(cb);
  }
}

export class Items {
  constructor(grid) {
    this.grid = grid;
  }

  map(cb) {
    return this.grid.getItems().map((item) => cb(new Item(this.grid, item)));
  }

  findByKey(key) {
    const item = this.grid
      .getItems()
      .find((item) => item._component.key === key);

    return new Item(this.grid, item);
  }

  at(index) {
    const item = this.grid.getItems()[index];
    return new Item(this.grid, item);
  }
}

export class Item {
  constructor(grid, item) {
    this.item = item;
    this.grid = grid;
  }

  simulateDrag() {
    this.item.isDragging = () => true;
    this.item._drag._preStartCheck(new Event('Test event'));
  }

  simulateRelease() {
    this.item.isDragging = () => false;
    this.item._drag._onEnd(new Event('Test event'));
    this.grid._emit('dragReleaseEnd', this.item);
  }

  isShowing() {
    return this.item.isShowing();
  }

  get index() {
    return this.grid.getItems().indexOf(this.item);
  }

  get key() {
    return this.item._component.key;
  }

  props() {
    return this.item._component.props;
  }

  element() {
    return this.item.getElement();
  }
}
