/**
 * 4 cases:
 *  - on window resize: handled by muuri (+ refresh items)
 *  - on grid resize because of props changes -> AUTO
 *  - on items resize because of props changes -> AUTO
 *
 *  - on item resize because of external event -> CALL THISs
 *
 *
 * @param param0
 */
export function refresh({ current }) {
  if (current) {
    const item = getItem(current);
    item.grid.refresh(item);
  }
}
