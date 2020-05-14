import type {RefObject} from 'react';
import type {
  GridOptions,
  DragStartPredicateOptions,
  DragSortPredicateOptions,
  DraggerEvent,
  DraggerStartEvent,
  DraggerMoveEvent,
  DraggerEndEvent,
  DraggerCancelEvent,
} from '../muuri'; // eslint-disable-line
import type {DecoratedGrid} from './grid';
import type {DecoratedItem} from './item';
import type {ReactGridProps} from './gridComponent';

/** Muuri options. */
export interface GridProps {
  /** The id of the grid. */
  id?: string;
  /** The group ids of the grid. */
  groupIds?: string[];
  /** Show duration. */
  showDuration?: GridOptions['showDuration'];
  /** Show easing. */
  showEasing?: GridOptions['showEasing'];
  /** Visible styles. */
  visibleStyles?: GridOptions['visibleStyles'];
  /** Hide duration. */
  hideDuration?: GridOptions['hideDuration'];
  /** Hide easing. */
  hideEasing?: GridOptions['hideEasing'];
  /** Hidden styles. */
  hiddenStyles?: GridOptions['hiddenStyles'];
  /** Layout. */
  layout?: GridOptions['layout'];
  /** Layout on resize. */
  layoutOnResize?: GridOptions['layoutOnResize'];
  /** Layout on init. */
  layoutOnInit?: GridOptions['layoutOnInit'];
  /** Layout duration. */
  layoutDuration?: GridOptions['layoutDuration'];
  /** Layout easing. */
  layoutEasing?: GridOptions['layoutEasing'];
  /** Drag handle. */
  dragHandle?: GridOptions['dragHandle'];
  /** Drag container. */
  dragContainer?:
    | GridOptions['dragContainer']
    | RefObject<GridOptions['dragContainer']>;
  /** Handle the drag start. */
  dragStartPredicate?: DragStartPredicateOptions | DecoratedDragStartPredicate;
  /** Drag axis. */
  dragAxis?: GridOptions['dragAxis'];
  /** Manage where an item can be dragged/sorted into. */
  dragSort?: boolean | DecoratedDragSortGetter | DecoratedDragSort;
  /** Drag sort heuristics. */
  dragSortHeuristics?: GridOptions['dragSortHeuristics'];
  /** Drag sort predicate. */
  dragSortPredicate?: DragSortPredicateOptions | DecoratedDragSortPredicate;
  /** Drag release. */
  dragRelease?: GridOptions['dragRelease'];
  /** Drag css props. */
  dragCssProps?: GridOptions['dragCssProps'];
  /** Drag placeholder. */
  dragPlaceholder?: DragPlaceholder;
  /** Drag auto scroll. */
  dragAutoScroll?: DragAutoScroll;
  /** Container class. */
  containerClass?: GridOptions['containerClass'];
  /** Item class. */
  itemClass?: GridOptions['itemClass'];
  /** Item visible class. */
  itemVisibleClass?: GridOptions['itemVisibleClass'];
  /** Item hidden class. */
  itemHiddenClass?: GridOptions['itemHiddenClass'];
  /** Item positioning class. */
  itemPositioningClass?: GridOptions['itemPositioningClass'];
  /** Item dragging class. */
  itemDraggingClass?: GridOptions['itemDraggingClass'];
  /** Item releasing class. */
  itemReleasingClass?: GridOptions['itemReleasingClass'];
  /** Item placeholder class. */
  itemPlaceholderClass?: GridOptions['itemPlaceholderClass'];
}

/** Maybe ref type. */
export type MaybeRef<T> = RefObject<T | null | undefined> | T;

/** DragStartPredicate function type. */
export type DecoratedDragStartPredicate = (
  item: DecoratedItem,
  event:
    | DraggerStartEvent
    | DraggerMoveEvent
    | DraggerEndEvent
    | DraggerCancelEvent
) => boolean | undefined;

/** DragSort function type. */
export type DecoratedDragSortGetter = (
  this: DecoratedGrid,
  item: DecoratedItem
) => DecoratedGrid[] | null | void | undefined;

/** DragSort object type. */
export type DecoratedDragSort = {groupId: string};

/** DragSortPredicate function type. */
export type DecoratedDragSortPredicate = (
  item: DecoratedItem,
  e: DraggerEvent
) => {
  index: number;
  grid: DecoratedGrid;
  action?: 'move' | 'swap';
};

/** DragPlaceholder type. */
export type DragPlaceholder = {
  /** Enabled. */
  enabled?: boolean;
  /** Generator. */
  createElement?(item: DecoratedItem): HTMLElement;
  /** On create callback. */
  onCreate?(item: DecoratedItem, placeholderElement: HTMLElement): void;
  /** On remove callback. */
  onRemove?(item: DecoratedItem, placeholderElement: HTMLElement): void;
};

/** DragAutoScroll element type. */
export type DragAutoScrollElement = HTMLElement | Window;

/** DragAutoScroll target element type. */
export type DragAutoScrollTargetElement =
  | RefObject<DragAutoScrollElement | null>
  | DragAutoScrollElement;

/** DragAutoScroll target element type. */
export type DragAutoScrollTargetObject = {
  element: DragAutoScrollTargetElement;
  axis?: number | null;
  priority?: number | null;
  threshold?: number | null;
};

/** DragAutoScroll target type. */
export type DragAutoScrollTarget =
  | DragAutoScrollTargetObject
  | DragAutoScrollTargetElement;

/** DragAutoScrollOnStart type. */
export type DragAutoScrollOnStart = (
  item: DecoratedItem,
  scrollElement: DragAutoScrollElement,
  scrollDirection: number
) => void;

/** DragAutoScrollOnStop type. */
export type DragAutoScrollOnStop = (
  item: DecoratedItem,
  scrollElement: DragAutoScrollElement,
  scrollDirection: number
) => void;

/** DragAutoScrollHandle type. */
export type DragAutoScrollHandle = (
  item: DecoratedItem,
  itemClientX: number,
  itemClientY: number,
  itemWidth: number,
  itemHeight: number,
  pointerClientX: number,
  pointerClientY: number
) => {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** DragAutoScrollSpeed type. */
export type DragAutoScrollSpeed = (
  item: DecoratedItem,
  scrollElement: DragAutoScrollElement,
  scrollData: {
    direction: number;
    threshold: number;
    distance: number;
    value: number;
    maxValue: number;
    duration: number;
    speed: number;
    deltaTime: number;
    isEnding: boolean;
  }
) => number;

/** DragAutoScroll type. */
export interface DragAutoScroll {
  targets?:
    | DragAutoScrollTarget[]
    | ((item: DecoratedItem) => DragAutoScrollTarget[]);
  handle?: DragAutoScrollHandle | null;
  threshold?: number;
  safeZone?: number;
  speed?: number | DragAutoScrollSpeed;
  sortDuringScroll?: boolean;
  syncAfterScroll?: boolean;
  smoothStop?: boolean;
  onStart?: DragAutoScrollOnStart | null;
  onStop?: DragAutoScrollOnStop | null;
}

/** MuuriComponent props. */
export interface MuuriComponentProps extends GridProps, ReactGridProps {}
