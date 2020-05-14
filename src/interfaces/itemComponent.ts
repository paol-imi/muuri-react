import type {ReactElement, Key} from 'react';
import type {DecoratedGrid} from './grid';
import type {ItemAddController, ItemRemoveController} from '../controllers';

// Item component props.
export interface ItemComponentProps {
  /** The Item child. */
  children: ReactElement;
  /** The Items class names. */
  itemClasses: string[];
  /** The add controller. */
  itemAddController: ItemAddController;
  /** The remove controller. */
  itemRemoveController: ItemRemoveController;
  /** The method to generate data. */
  propsToData?: (data: object) => object;
  /** The key of the Item */
  itemKey: Key;
  /** The muuri instance. */
  grid: DecoratedGrid;
}
