import type {Key} from 'react';
import type {Item} from '../muuri'; // eslint-disable-line
import type {Decorated} from './decorators';
import type {DecoratedGrid} from './grid';
import type {
  ChildrenController,
  EventController,
  FiberController,
} from '../controllers';
import type key from '../utils/decorators/decorationKey';

// Item decoration.
export interface ItemDecoration {
  /** The props of the component that represent the item. */
  props: object;
  /** The data of the component that represent the item. */
  data: object;
  /** The key of the component that represent the item. */
  key: Key;
  /** The fiber node of the component that represent the item. */
  fiber?: object | null;
  /** The event controller of the component that represent the item. */
  eventController: EventController;
  /** The saved width (used within dragFixed). */
  dragWidth: string;
  /** The saved width (used within dragFixed). */
  dragHeight: string;
  /** The saved width (used within dragFixed). */
  dragPaddingTop: string;
  /** If the item can be dragged. */
  draggable?: boolean | null;
  /** Send payload (used within onSend). */
  sentPayload?: {
    fromChildrenController: ChildrenController;
    fromFiberController: FiberController;
    fromGrid: DecoratedGrid;
    fromIndex: number;
  } | null;
  /** Receive payload (used within onSend). */
  receivedPayload?: {
    toChildrenController: ChildrenController;
    toFiberController: FiberController;
    toGrid: DecoratedGrid;
    toIndex: number;
  } | null;
}

// The deorated item interface.
export interface DecoratedItem extends Decorated, Item {
  /** The decoration. */
  [key]: ItemDecoration;
  /** Wrapped method to allow decorated instances. */
  getGrid(): DecoratedGrid;
  /** Component key getter. */
  getKey(): Key;
  /** Component data getter. */
  getData(): object;
  /** Component data setter. */
  setData(data: object): void;
}
