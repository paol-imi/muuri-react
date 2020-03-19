/**
 * Decorate an item.
 * @param {Muuri.item} item
 */
export function decorateItem(item) {
  /**
    props,
    data,
    key,
    fiber,
    eventController,
    dragWidth,
    dragHeight,
    draggable
   */
  item._component = {};
  item.getProps = function getProps() {
    return this._component.props || {};
  };
  item.getData = function getData() {
    return this._component.data || {};
  };
  item.setData = function setData(data) {
    item._component.data = Object.assign(this._component.data || {}, data);
  };
  item.deleteData = function deleteData() {
    this._component.data = {};
  };

  // Change the sort data.
  Object.defineProperty(item, "_sortData", {
    get() {
      return this.getData();
    },
    set() {
      // nothing to do here.
    }
  });
}
