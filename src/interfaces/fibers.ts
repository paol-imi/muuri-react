// eslint-disable-next-line
import type ReactReconciler from 'react-reconciler';

/** Flag type. */
export type Flag = '0' | '1';

/** Use this file as the only source for fibers. */
export type Fiber = ReactReconciler.Fiber;

/** The fiber of the item element. */
export interface ItemElementFiber extends Fiber {
  stateNode: HTMLElement;
}

/** The fibers between the Item provider and the item outer element. */
export interface ItemFiber extends Fiber {
  child: ItemFiber | ItemElementFiber;
  return: ItemFiber | ItemProviderFiber;
}

/** Item component fiber. */
export interface ItemProviderFiber extends Fiber {
  child: ItemFiber;
  return: ItemComponentFiber;
  alternate: ItemProviderFiber | null;
}

/** Item component fiber. */
export interface ItemComponentFiber extends Fiber {
  child: ItemProviderFiber;
  return: GridElementFiber;
  alternate: ItemComponentFiber | null;
  sibling: ItemComponentFiber | null;
}

/** Grid element fiber. */
export interface GridElementFiber extends Fiber {
  child: ItemComponentFiber | null;
  alternate: GridElementFiber | null;
}
