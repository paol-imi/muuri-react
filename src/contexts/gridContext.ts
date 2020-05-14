import {createContext, useContext} from 'react';
import type {DecoratedGrid} from '../interfaces';
import type {LayoutController} from '../controllers';

// Context value shape.
export type GridContextValue = {
  grid: DecoratedGrid;
  layoutController: LayoutController;
};

// Grid context.
export const GridContext = createContext<Partial<GridContextValue>>({});
// Grid provider.
export const GridProvider = GridContext.Provider;
// Grid context hook.
export const useGridContext = () => useContext(GridContext);
// Grid provider display name.
GridContext.displayName = 'GridProvider';
