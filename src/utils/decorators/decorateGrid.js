export const positions = ["relative", "absolute", "fixed"];

/**
 * Decorate a grid element.
 * @param {Element} gridElem
 */
export function decorateGrid(gridElem, muuri) {
  const position = getComputedStyle(gridElem).position;

  if (!positions.includes(position)) {
    gridElem.style.position = positions[0];
  }

  gridElem.classList.add(muuri._settings.containerClass);
}
