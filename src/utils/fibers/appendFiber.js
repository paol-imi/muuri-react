/**
 * Append a child in the end of a fiber node.
 * @param {React.Fiber} itemsOwner
 * @param {React.Component} child
 */
export function appendFiber(itemsOwner, child) {
  appendChild(itemsOwner, child);

  if (child.alternate) {
    if (itemsOwner.alternate) {
      appendChild(itemsOwner.alternate, child.alternate);
    }

    //child.alternate.alternate = null;
    //child.alternate = null;
  }
}

/**
 * Append a child in the end of a fiber node.
 * @param {React.Fiber} itemsOwner
 * @param {React.Component} child
 */
function appendChild(itemsOwner, child) {
  if (!itemsOwner.child) {
    itemsOwner.child = child;
    child.index = 0;
  } else {
    let c = itemsOwner.child;
    while (c.sibling) {
      c = c.sibling;
    }
    child.index = c.index + 1;
    c.sibling = child;
  }

  child.return = itemsOwner;
  if (child._debugOwner) child._debugOwner = itemsOwner.return.return;
}
