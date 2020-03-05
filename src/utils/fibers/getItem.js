/**
 * Get the fiber of the item from the fiber of the ItemComponent.
 * @param {React.fiber} itemComponent
 * @return {React.fiber}
 */
export function getItem(itemComponent) {
  /**
   * ItemComponent -> ItemProvider -> Item
   */
  return itemComponent.child.child;
}
