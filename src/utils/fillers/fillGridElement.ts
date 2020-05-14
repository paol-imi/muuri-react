// Allowed position values.
const positions = ['relative', 'absolute', 'fixed'];

/**
 * Fill a grid element:
 * - If it is not position the style.position is setted to "relative".
 * - The CSS "containerClass" is added.
 *
 * It also wrap the className setter to
 * avoid React to remove the standard class
 * of Muuri from the grid.
 *
 * @param gridElement - The element to fill.
 * @param gridClass - The Css class of the grid element.
 */
export function fillGridElement(
  gridElement: HTMLElement,
  gridClass: string
): void {
  const position = getComputedStyle(gridElement).position;

  // Set the default position.
  if (!positions.includes(position)) {
    gridElement.style.position = positions[0];
  }

  // Set the grid class.
  gridElement.classList.add(gridClass);

  // Ensure that the grid class can't be removed.
  const defaultSetAttribute = gridElement.setAttribute.bind(gridElement);
  gridElement.setAttribute = function setAttribute(attribute, value) {
    if (attribute === 'class') {
      const classNames = (gridElement.getAttribute('class') || '').split(' ');
      // Add the grid class.
      if (!classNames.includes(gridClass)) value = `${value} ${gridClass}`;
    }

    defaultSetAttribute(attribute, value);
  };
}
