import type {
  DecoratedGrid,
  DecoratedItem,
  ReactGridProps,
} from '../../interfaces';

/**
 * Sort the items.
 *
 * @param grid - The grid instance.
 * @param predicate - The sort predicate.
 * @param sortOptions - The sort options.
 */
export function sortItems(
  grid: DecoratedGrid,
  predicate: Exclude<ReactGridProps['sort'], undefined>,
  sortOptions: ReactGridProps['sortOptions']
): void {
  // Disable the layout.
  // @ts-ignore
  sortOptions = {...(sortOptions || {}), layout: false};

  // Handle a function.
  if (typeof predicate === 'function') {
    handleFunction(grid, predicate, sortOptions);
  }

  // Handle a string.
  if (typeof predicate === 'string') {
    handleString(grid, predicate, sortOptions);
  }

  // Hanndle an array of keys.
  if (Array.isArray(predicate)) {
    handleArray(grid, predicate, sortOptions);
  }
}

/**
 * Sort the items given a predicate function.
 *
 * @param grid - The grid instance.
 * @param predicate - The predicate function.
 * @param sortOptions - The sort options.
 */
function handleFunction(
  grid: DecoratedGrid,
  predicate: Extract<ReactGridProps['sort'], Function>,
  sortOptions: ReactGridProps['sortOptions']
): void {
  grid.sort(
    (itemA, itemB) => predicate(itemA.getData(), itemB.getData(), itemA, itemB),
    sortOptions
  );
}

/**
 * Sort the items given a predicate string.
 *
 * @param grid - The grid instance.
 * @param predicate - The predicate string.
 * @param sortOptions - The sort options.
 */
function handleString(
  grid: DecoratedGrid,
  predicate: Extract<ReactGridProps['sort'], string>,
  sortOptions: ReactGridProps['sortOptions']
): void {
  grid.sort(predicate, sortOptions);
}

/**
 * Sort the items given an array of keys.
 * If the key has a match, the item is inserted in that position, otherwise at the bottom.
 *
 * @param grid - The grid instance.
 * @param predicate - The array of keys.
 * @param sortOptions - The sort options.
 */
function handleArray(
  grid: DecoratedGrid,
  predicate: Extract<ReactGridProps['sort'], Array<any>>,
  sortOptions: ReactGridProps['sortOptions']
): void {
  const items: DecoratedItem[] = grid.getItems();
  // Items that can be sorted.
  const sortedItems: DecoratedItem[] = [];
  // Items that can't be sorted.
  const otherItems: DecoratedItem[] = [];

  // Fills the arrays.
  items.forEach((item) => {
    const itemKey = item._component.key;
    const index = predicate.findIndex((key) => key === itemKey);

    if (index > -1) {
      sortedItems[index] = item;
    } else {
      otherItems.push(item);
    }
  });

  // Sort.
  grid.sort(
    Array.prototype.concat(
      // Some position can be empty.
      sortedItems.filter((item) => !!item),
      otherItems
    ),
    sortOptions
  );
}
