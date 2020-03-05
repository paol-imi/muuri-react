/**
 * Get the fiber parent of the items given the gridComponent.
 * @param {React.Component} gridComponent
 * @return {React.Fiber}
 */
export function getItemsOwner(gridComponent) {
  /**
   * MuuriComponent -> GridComponent -> GridElement
   */
  return gridComponent._owner.child;
}
