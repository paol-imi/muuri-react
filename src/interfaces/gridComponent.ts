import type {ReactElement, Key} from 'react';
import type {DraggerEvent} from '../muuri'; // eslint-disable-line
import type {DecoratedGrid} from './grid';
import type {DecoratedItem} from './item';
import type {GridProps} from './muuriComponent';

// Grid props.
export interface ReactGridProps {
  /** The items to render. */
  children?: ReactElement[];
  /** The attributes of the grid element. */
  gridProps?: object;
  /** The filter predicate of th grid. */
  filter?: (data: object, item?: DecoratedItem) => boolean;
  /** The sort predicate of the grid. */
  sort?:
    | string
    | ((
        dataA: object,
        dataB: object,
        itemA?: DecoratedItem,
        itemB?: DecoratedItem
      ) => number)
    | Key[];
  /** The sort options. */
  sortOptions?: {descending?: boolean};
  /** Add options. */
  addOptions?: {show?: boolean};
  /** Function that generate the items data. */
  propsToData?: (props: object) => object;
  /** Method used within Reparenting. */
  onSend?: (payload: {
    key: Key;
    fromGrid: DecoratedGrid;
    fromId: GridProps['id'];
    fromGroupIds: GridProps['groupIds'];
    fromIndex: number;
    toGrid: DecoratedGrid;
    toId: GridProps['id'];
    toGroupIds: GridProps['groupIds'];
    toIndex: number;
  }) => void;
  /** Called when the drag of an item starts. */
  onDragStart?: (item: DecoratedItem, event: DraggerEvent) => void;
  /** Called when the drag of an item ends. */
  onDragEnd?: (item: DecoratedItem) => void;
  /** Called when the filter is applied. */
  onFilter?: (
    shownItems: DecoratedItem[],
    hiddenItems: DecoratedItem[]
  ) => void;
  /** Called when the sort is applied. */
  onSort?: (
    currentOrder: DecoratedItem[],
    previousOrder: DecoratedItem[]
  ) => void;
  /** On mount callback. */
  onMount?: (grid: DecoratedGrid) => void;
  /** On unmount callback. */
  onUnmount?: (grid: DecoratedGrid) => void;
  /** Filter and sort are re-applied also if their values have not changed. */
  forceSync?: boolean;
  /** Fix the dimensione of the items during drag? */
  dragFixed?: boolean;
  /** Enable the drag of the items. */
  dragEnabled?: boolean;
  /** If the items should be positioned instantly without any possible animation. */
  instantLayout?: boolean;
}

// Grid component props.
export interface GridComponentProps extends ReactGridProps {
  grid: DecoratedGrid;
}
