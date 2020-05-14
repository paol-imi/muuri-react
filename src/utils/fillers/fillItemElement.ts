/**
 * Fill an Item (outer) element:
 * - style.position setted to "absolute".
 *
 * It also wrap the className setter to
 * avoid React to remove the standard classes
 * of Muuri from the item.
 *
 * @param itemElement - The item element to fill.
 * @param itemClasses - The Css classes of the items.
 */
export function fillItemElement(
  itemElement: HTMLElement,
  itemClasses: string[]
): void {
  itemElement.style.position = 'absolute';

  // Ensure that the Css item classes are not removed.
  const defaultSetAttribute = itemElement.setAttribute.bind(itemElement);
  itemElement.setAttribute = function setAttribute(attribute, value) {
    if (attribute === 'class') {
      const classNames = (itemElement.getAttribute('class') || '').split(' ');
      const classNamesToAdd = classNames.filter((className) =>
        itemClasses.includes(className)
      );

      // Add the Css items classes.
      value = `${value} ${classNamesToAdd.join(' ')}`;
    }

    defaultSetAttribute(attribute, value);
  };
}
