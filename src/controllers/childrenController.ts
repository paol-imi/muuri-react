import {Children} from 'react';
import type {ReactElement, Key} from 'react';

/**
 * CONTROLLER: GRID
 *
 * The purpose of this controller is to manage children
 * during each render of the component, and provide
 * the indexes of the new children added.
 */
export class ChildrenController {
  /** The old children. */
  _oldChildrenArray: ReactElement[] = [];
  /** The current children. */
  _children: ReactElement[] = [];
  /** The indices of the last added children. */
  _indicesToAdd: number[] = [];
  /** The number of the items being dragged. */
  _dragCounter = 0;

  /**
   * Init all the settings given the new children.
   *
   * @param newChildren - the new children.
   */
  useInit(newChildren?: ReactElement[]): void {
    // @ts-ignore
    // We need to ensure that the children are in an array.
    const newChildrenArray: ReactElement[] = Children.toArray(newChildren);

    // The indices to add.
    this._indicesToAdd = getIndicesToAdd(
      newChildrenArray,
      this._oldChildrenArray
    );

    // The _children will be used to map all
    // the child in the render method.
    // We can't use the ChildrenArray because we need the users
    // key provided in the components and not the escaped one (e.g. .$1).
    this._children = newChildren || [];
    this._oldChildrenArray = newChildrenArray;
  }

  /**
   * Remove a child in the given position and return it.
   *
   * @param index - The index of the child to remove.
   * @returns - The removed child.
   */
  remove(index: number): ReactElement {
    return this._oldChildrenArray.splice(index, 1)[0];
  }

  /**
   * Append a child in the children array.
   *
   * @param child - The child to append.
   */
  append(child: ReactElement): void {
    this._oldChildrenArray.push(child);
  }

  /**
   * Returns the ordered array of indices of the added children.
   */
  getIndicesToAdd(): number[] {
    return this._indicesToAdd;
  }

  /**
   * Map all the children.
   *
   * @param cb - The callback.
   * @returns - The mapped children.
   */
  render(cb: (child: ReactElement, key: Key) => ReactElement): ReactElement[] {
    const children = Children.map(this._children, (child) => {
      // @ts-ignore
      // there are rare cases where the keys are not indispensable,
      // the user may not choose to use at his own risk.
      return cb(child, child.key);
    });

    // Flush the children.
    this.flush();

    return children;

    /**
    // If an item is being dragged we need to ensure
    // that no child is inserted before it.
    return this._dragCounter === 0
      ? children
      : getChildrenInSafePositions(children, this._indicesToAdd);
       */
  }

  /**
   * Increment the drag counter.
   */
  incrementDragCounter(): void {
    this._dragCounter += 1;
  }

  /**
   * Decrement the drag counter.
   */
  decrementDragCounter(): void {
    this._dragCounter -= 1;
  }

  /**
   * Remove the current children so they can be garbage collected.
   */
  flush(): void {
    this._children = [];
  }

  /**
   * Destroy the instance.
   */
  destroy(): void {
    this.flush();
  }
}

/**
 * Return an array of positions of the added children.
 * The algorithm is optimized for cases where the order of
 * the items does not change during re-renders (about 100% of cases).
 * The positions are in ascending order.
 *
 * @param newChildren - The new children.
 * @param oldChildren - The old children.
 * @return - The indices.
 */
export function getIndicesToAdd(
  newChildren: React.ReactElement[],
  oldChildren: React.ReactElement[]
): number[] {
  const indicesToAdd: number[] = [];
  let oIndex = 0;

  for (let nIndex = 0; nIndex < newChildren.length; nIndex++) {
    // Finde the index.
    const index = findIndex(oldChildren, newChildren[nIndex], oIndex);

    if (index === -1) {
      // If it is not present is a new Child.
      indicesToAdd.push(nIndex);
    } else {
      // If it is present restart the research
      // from the given index.
      oIndex = index;
    }
  }

  return indicesToAdd;
}

/**
 * Returns the index of the child in the children array,
 * if it is not present returns -1.
 * The research start from the given 'fromIndex'.
 *
 * @param child - The child to search.
 * @param children - The children.
 * @param fromIndex - The initial index.
 * @returns - The index of the child.
 */
function findIndex(
  children: React.ReactElement[],
  child: React.ReactElement,
  fromIndex: number
): number {
  fromIndex = fromIndex > children.length ? children.length : fromIndex;

  // If the heuristics are respected the child will be here.
  for (let index = fromIndex; index < children.length; index++) {
    if (is(child, children[index])) return index;
  }

  // If the child is here the heuristics are not respected.
  for (let index = 0; index < fromIndex; index++) {
    if (is(child, children[index])) return index;
  }

  // The child is not present.
  return -1;
}

/**
 * There would be the risk that a component will be inserted before
 * an item that is being dragged (and that is placed in a drag
 * container that is not the grid element). React would use
 * insertBefore to add the elements and this would cause an error.
 * To avoid this problem, if any item is being dragged,
 * all new components are added at the end so that
 * React uses appendChild to add the elements in the DOM.
 *
 * @param children - The new children to set.
 * @param indicesToAdd - The indices of the added children.
 * @returns - The children in safe postions.
 *
function getChildrenInSafePositions(
  newChildren: ReactElement[],
  indicesToAdd: number[]
): ReactElement[] {
  // Check if there are dragged items.
  if (indicesToAdd.length === 0) return newChildren;

  const addedChildren: ReactElement[] = [];

  // Set the added children.
  indicesToAdd.reverse().forEach((index) => {
    const [newChild] = newChildren.splice(index, 1);
    addedChildren.push(newChild);
  });

  return newChildren.concat(addedChildren);
}

/**
 * Return if the components have the same key.
 *
 * @param componentA - The first component.
 * @param componentB - The second component.
 * @returns - If they have the same key.
 */
function is(
  componentA: React.ReactElement,
  componentB: React.ReactElement
): boolean {
  return componentA.key === componentB.key;
}
