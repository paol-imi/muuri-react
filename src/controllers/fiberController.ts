import {useEffect} from 'react';
import type {RefObject, Key} from 'react';
import {invariant} from '../invariant';
import type {
  Fiber,
  Flag,
  GridElementFiber,
  ItemComponentFiber,
} from '../interfaces';

/**
 * CONTROLLER: GRID
 *
 * The purpose of this controller is to manage the fiber node of the GridElements.
 * The Fiber nodes allow to manage reparenting and easily access new added items elements.
 */
export class FiberController {
  /** The fiber of the grid Element that contains all the ItemComponents. */
  // @ts-ignore
  _fiber: GridElementFiber;
  /** The current flag value. */
  _flag: Flag = '0';

  /**
   * Init the controller given the grid Element ref.
   *
   * @param gridElementRef - the ref of the grid element.
   */
  useInit(gridElementRef: RefObject<HTMLElement>): void {
    this.updateFlag();
    // eslint-disable-next-line
    useEffect(() => {
      invariant(gridElementRef.current !== null);
      this._fiber = getFiber(gridElementRef.current);
    }, []); // eslint-disable-line
  }

  /**
   * Return the DOM elements in the chosen positions.
   *
   * @param orderedIndices - The positions.
   * @returns - The elements.
   */
  getStateNodes(orderedIndices: number[]): HTMLElement[] {
    const stateNodes: HTMLElement[] = [];
    // If there aren't indices retun an empty array.
    if (orderedIndices.length === 0) return stateNodes;

    // The first child.
    let child = getCurrentFiber(this._fiber, this._flag).child;

    // Fill the state nodes array.
    // We trust that the user input.
    orderedIndices.forEach((index) => {
      // @ts-ignore
      while (child.index !== index) {
        // @ts-ignore
        child = child.sibling;
      }

      // @ts-ignore
      stateNodes.push(getStateNode(child));
    });

    return stateNodes;
  }

  /**
   * Append an itemComponent fiber
   * (the same is done for the alternate if exists).
   *
   * @param child - The item.
   */
  append(itemComponentFiber: ItemComponentFiber): void {
    // Get the current fiber.
    const fiber = getCurrentFiber(this._fiber, this._flag);
    // Append the fiber.
    appendFiber(fiber, itemComponentFiber);

    if (fiber.alternate) {
      if (itemComponentFiber.alternate) {
        // Append the alternate.
        appendFiber(fiber.alternate, itemComponentFiber.alternate);
      }
    }
  }

  /**
   * Remove an itemComponent fiber given the key of its Item
   * (The same is done for the alternate if exists).
   *
   * @param key - The key of the item.
   * @returns - The removed item.
   */
  remove(key: Key): ItemComponentFiber {
    // Get the current fiber.
    const fiber = getCurrentFiber(this._fiber, this._flag);
    // Remove the fiber.
    const removedChild = removeChild(fiber, key);

    if (fiber.alternate) {
      if (removedChild.alternate) {
        // Remove the alternate.
        removeChild(fiber.alternate, key);
      }
    }

    return removedChild;
  }

  /**
   * Return the props containing the flag value to add in the grid element.
   *
   * @returns - The props.
   */
  getFlagProp(): {[FlagProp]: Flag} {
    return {[FlagProp]: this._flag};
  }

  /**
   * Update the flag value.
   */
  updateFlag(): void {
    if (this._flag === '0') this._flag = '1';
    else this._flag = '0';
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    // @ts-ignore
    this._fiber = null;
  }
}

/**
 * The flag prop name.
 */
export const FlagProp = 'muuri-react-flag';

/**
 * Get the fiber of the given grid element.
 *
 * @param grid - The element.
 * @return - The fiber node.
 */
function getFiber(grid: HTMLElement): GridElementFiber {
  const key = Object.keys(grid).find(
    (key) =>
      key.startsWith('__reactInternalInstance$') ||
      key.startsWith('__reactFiber$')
  );

  invariant(
    typeof key === 'string',
    'Cannot find the __reactInternalInstance$'
  );

  // @ts-ignore
  return grid[key];
}

/**
 * Return the current fiber.
 * Try to use the prop flag for the search first,
 * if this is not possible try the RootFiber.
 * The research on the flag is carried out because it is more
 * performing than the second and because if the React team
 * decides to change the functioning of the RootFiber,
 * not all features will stop working.
 * (It is rare for this to happen in the current version 16.x.x,
 * but if it does, it would not be a breacking change.)
 *
 * @param fiber - The fiber.
 * @param flag - the flag.
 * @returns - The current fiber.
 */
function getCurrentFiber(
  fiber: GridElementFiber,
  currentFlag: Flag
): GridElementFiber {
  if (!fiber.alternate) return fiber;

  // Flags.
  const fiberFlag = fiber.memoizedProps[FlagProp];
  const alternateFlag = fiber.alternate.memoizedProps[FlagProp];

  // If the two flags are the same it should mean that
  // in at least one of the items there has been a re-render
  // from the last render of the GridComponent.
  // We can no longer trust the flag prop and we have
  // to look for the RootFiber and check which
  // fiber is in the current tree.
  if (fiberFlag === alternateFlag) {
    let topFiber: Fiber = fiber;

    // Get the top fiber
    // (Not the RootFiber).
    while (topFiber.return) {
      topFiber = topFiber.return;
    }

    // Fibers.
    const rootFiber = topFiber.stateNode;
    const topCurrentFiber = rootFiber.current;

    // The current fiber.
    return topCurrentFiber === topFiber ? fiber : fiber.alternate;
  }

  // If we got here we can trust the flag prop to find the current Fiber.
  return fiberFlag === currentFlag ? fiber : fiber.alternate;
}

/**
 * Returns the first stateNode among the descendants
 * of the given itemComponent Fiber.
 *
 * @param itemComponentFiber - The fiber.
 * @returns - The element.
 */
function getStateNode(itemComponentFiber: ItemComponentFiber): HTMLElement {
  // ItemComponent -> ItemProvider -> Item.
  let itemFiber = itemComponentFiber.child.child;
  // @ts-ignore
  while (!(itemFiber.stateNode instanceof HTMLElement))
    // @ts-ignore
    itemFiber = itemFiber.child;

  return itemFiber.stateNode;
}

/**
 * Append the child fiber in the last position among the children of the parent fiber.
 *
 * @param parent - The parent fiber.
 * @param child - The child fiber.
 */
function appendFiber(
  parent: GridElementFiber,
  child: ItemComponentFiber
): void {
  if (!parent.child) {
    // If it has no child.
    parent.child = child;
    child.index = 0;
  } else {
    let c = parent.child;
    while (c.sibling) {
      c = c.sibling;
    }
    child.index = c.index + 1;
    // Inserted as last child.
    c.sibling = child;
  }

  // Update the references.
  child.return = parent;
  // If we are in development.
  if (child._debugOwner) child._debugOwner = parent.return?.return;
}

/**
 * Remove a child with the given key from the fiber.
 *
 * @param parent - The fiber.
 * @param key - The key of the item.
 * @return - The removed fiber.
 */
function removeChild(parent: GridElementFiber, key: Key): ItemComponentFiber {
  let child = parent.child;
  let removedChild;

  // @ts-ignore
  if (hasNot(child, key)) {
    // @ts-ignore
    while (hasNot(child.sibling, key)) {
      // @ts-ignore
      child = child.sibling;
    }
    // @ts-ignore
    removedChild = removeSibling(child);
    // @ts-ignore
    adjustIndices(child);
  } else {
    removedChild = removeFirstChild(parent);
    // @ts-ignore
    child = child.sibling;
    if (child) adjustIndices(child);
  }

  removedChild.sibling = null;
  return removedChild;
}

/**
 * Remove the first itemComponent fiber of a gridELement fiber and return it.
 *
 * @param GridElementFiber - The gridELement fiber.
 * @return - The removed itemComponent fiber.
 */
function removeFirstChild(
  gridElementFiber: GridElementFiber
): ItemComponentFiber {
  const removed = gridElementFiber.child;
  // @ts-ignore
  gridElementFiber.child = gridElementFiber.child.sibling;
  // @ts-ignore
  return removed;
}

/**
 * Remove the first sibling from a itemComponent fiber and return it.
 *
 * @param fiber - The fiber.
 * @return - The removed sibling.
 */
function removeSibling(fiber: ItemComponentFiber): ItemComponentFiber {
  const removed = fiber.sibling;
  // @ts-ignore
  fiber.sibling = fiber.sibling.sibling;
  // @ts-ignore
  return removed;
}

/**
 * Adjust the indices of the siblings of an itemComponent fiber.
 *
 * @param itemComponentFiber - The itemComponent fiber.
 */
function adjustIndices(itemComponentFiber: ItemComponentFiber): void {
  while (itemComponentFiber.sibling) {
    itemComponentFiber.sibling.index = itemComponentFiber.index + 1;
    itemComponentFiber = itemComponentFiber.sibling;
  }
}

/**
 * Returns if the itemComponent fiber is not the parent of the item with the given key.
 *
 * @param itemComponentFiber - The itemComponent fiber.
 * @param key - The key of the item.
 * @return - If the itemComponent fiber is not the parent of the item with the given key.
 */
function hasNot(itemComponentFiber: ItemComponentFiber, key: Key): boolean {
  // ItemComponent -> ItemProvider -> Item.
  return itemComponentFiber.child.child.key !== key;
}
