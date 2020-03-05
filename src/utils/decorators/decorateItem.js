/**
 * Decorate an item.
 * @param {Muuri.item} item
 */
export function decorateItem(item) {
  item._component = {};
  item.getProps = function() {
    return this._component.props || {};
  };
  item.getData = function() {
    return this._component.data || {};
  };
  item.setData = function(data) {
    item._component.data = Object.assign(this._component.data || {}, data);
  };
  item.deleteData = function() {
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
