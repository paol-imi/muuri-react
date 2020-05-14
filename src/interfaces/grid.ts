import type {DecoratedItem} from './item';
import type {
  Grid,
  GridEvents,
  LayoutOnFinish,
  DraggerStartEvent,
  DraggerMoveEvent,
  ScrollEvent,
  DraggerEndEvent,
  DraggerCancelEvent,
  Item,
} from '../muuri'; // eslint-disable-line
import type {GridProps} from './muuriComponent';
import type {ReactGridProps} from './gridComponent';
import type {ItemRemoveController} from '../controllers';
import type key from '../utils/decorators/decorationKey';

/** Grid decoration interface. */
export interface GridDecoration {
  /** The id of the MuuriComponent related to the instance. */
  id?: GridProps['id'];
  /** The groupIds of the MuuriComponent related to the instance. */
  groupIds?: GridProps['groupIds'];
  /** If the items can be dragged. */
  dragEnabled?: ReactGridProps['dragEnabled'];
  /** The item remove controller. */
  itemRemoveController: ItemRemoveController;
  /** The sizer element. */
  sizerElement: HTMLElement;
}

/** Decorated Grid interface */
export interface DecoratedGrid extends Grid {
  /** The decoration. */
  [key]: GridDecoration;
  /** Component id getter. */
  getId(): GridProps['id'];
  /** Component groupIds getter. */
  getGroupIds(): GridProps['groupIds'];
  /** Get the sizer element. */
  getSizerElement(): HTMLElement;
  /** Wrapped method to allow decorated instances. */
  on<T extends keyof DecoratedGridEvents>(
    event: T,
    listener: DecoratedGridEvents[T]
  ): this;
  /** Wrapped method to allow decorated instances. */
  off<T extends keyof DecoratedGridEvents>(
    event: T,
    listener: DecoratedGridEvents[T]
  ): this;
  /** Wrapped method to allow decorated instances. */
  getItem(target: HTMLElement | number | DecoratedItem): DecoratedItem | null;
  /** Wrapped method to allow decorated instances. */
  getItem(target: string): DecoratedItem | null;
  /** Wrapped method to allow decorated instances. */
  getItems(
    targets?:
      | HTMLElement
      | number
      | DecoratedItem
      | Array<HTMLElement | number | DecoratedItem>
  ): DecoratedItem[];
  /** Wrapped method to allow decorated instances. */
  getItems(targets?: string | string[]): DecoratedItem[];
  /** Wrapped method to allow decorated instances. */
  add(
    elements: HTMLElement | HTMLElement[] | NodeList | HTMLCollection,
    options?: {
      index?: number;
      active?: boolean;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): DecoratedItem[];
  /** Wrapped method to allow decorated instances. */
  remove(
    items: DecoratedItem[],
    options?: {
      removeElements?: boolean;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): DecoratedItem[];
  /** Wrapped method to allow decorated instances. */
  show(
    items: DecoratedItem[],
    options?: {
      instant?: boolean;
      syncWithLayout?: boolean;
      onFinish?: (items: DecoratedItem[]) => void;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  hide(
    items: DecoratedItem[],
    options?: {
      instant?: boolean;
      syncWithLayout?: boolean;
      onFinish?: (items: DecoratedItem[]) => any;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  filter(
    predicate: string | ((item: DecoratedItem) => boolean),
    options?: {
      instant?: boolean;
      syncWithLayout?: boolean;
      onFinish?: (items: DecoratedItem[]) => any;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  sort(
    comparer:
      | ((a: DecoratedItem, b: DecoratedItem) => number)
      | string
      | Item[],
    options?: {
      descending?: boolean;
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  move(
    item: HTMLElement | number | DecoratedItem,
    position: HTMLElement | number | DecoratedItem,
    options?: {
      action?: 'move' | 'swap';
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  move(
    item: HTMLElement | number | DecoratedItem | string,
    position: HTMLElement | number | DecoratedItem | string,
    options?: {
      action?: 'move' | 'swap';
      layout?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  send(
    item: HTMLElement | number | DecoratedItem,
    targetGrid: Grid,
    position: HTMLElement | number | DecoratedItem,
    options?: {
      appendTo?: HTMLElement;
      layoutSender?: boolean | 'instant' | LayoutOnFinish;
      layoutReceiver?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
  /** Wrapped method to allow decorated instances. */
  send(
    item: HTMLElement | number | DecoratedItem | string,
    targetGrid: Grid,
    position: HTMLElement | number | DecoratedItem | string,
    options?: {
      appendTo?: HTMLElement;
      layoutSender?: boolean | 'instant' | LayoutOnFinish;
      layoutReceiver?: boolean | 'instant' | LayoutOnFinish;
    }
  ): this;
}

/** Decorated grid events. */
export interface DecoratedGridEvents extends GridEvents {
  /** Layout start event. */
  layoutStart(items: DecoratedItem[], isInstant: boolean): void;
  /** Layout end event. */
  layoutEnd(items: DecoratedItem[]): void;
  /** Layout abort event. */
  layoutAbort(items: DecoratedItem[]): void;
  /** Add event. */
  add(items: DecoratedItem[]): void;
  /** Remove event. */
  remove(items: DecoratedItem[], indices: number[]): void;
  /** Show start event. */
  showStart(items: DecoratedItem[]): void;
  /** Show end event. */
  showEnd(items: DecoratedItem[]): void;
  /** Hide start event. */
  hideStart(items: DecoratedItem[]): void;
  /** Hide end event. */
  hideEnd(items: DecoratedItem[]): void;
  /** Filter event. */
  filter(shownItems: DecoratedItem[], hiddenItems: DecoratedItem[]): void;
  /** Sort event. */
  sort(currentOrder: DecoratedItem[], previousOrder: DecoratedItem[]): void;
  /** Move event. */
  move(data: {
    item: DecoratedItem;
    fromIndex: number;
    toIndex: number;
    action: 'move' | 'swap';
  }): void;
  /** Send event. */
  send(data: {
    item: DecoratedItem;
    fromGrid: DecoratedGrid;
    fromIndex: number;
    toGrid: DecoratedGrid;
    toIndex: number;
  }): void;
  /** Before send event. */
  beforeSend(data: {
    item: DecoratedItem;
    fromGrid: DecoratedGrid;
    fromIndex: number;
    toGrid: DecoratedGrid;
    toIndex: number;
  }): void;
  /** Receive event. */
  receive(data: {
    item: DecoratedItem;
    fromGrid: DecoratedGrid;
    fromIndex: number;
    toGrid: DecoratedGrid;
    toIndex: number;
  }): void;
  /** Before receive event. */
  beforeReceive(data: {
    item: DecoratedItem;
    fromGrid: DecoratedGrid;
    fromIndex: number;
    toGrid: DecoratedGrid;
    toIndex: number;
  }): void;
  /** Drag init event. */
  dragInit(
    item: DecoratedItem,
    event: DraggerStartEvent | DraggerMoveEvent
  ): void;
  /** Drag init event. */
  dragStart(
    item: DecoratedItem,
    event: DraggerStartEvent | DraggerMoveEvent
  ): void;
  /** Drag move event. */
  dragMove(item: DecoratedItem, event: DraggerMoveEvent): void;
  /** Drag scroll event. */
  dragScroll(item: DecoratedItem, event: ScrollEvent): void;
  /** Drag end event. */
  dragEnd(
    item: DecoratedItem,
    event: DraggerEndEvent | DraggerCancelEvent
  ): void;
  /** Drag release start event. */
  dragReleaseStart(item: DecoratedItem): void;
  /** Drag release end event. */
  dragReleaseEnd(item: DecoratedItem): void;
}
