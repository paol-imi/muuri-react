/// <reference types="react" />
import type { DecoratedGrid } from "../interfaces";
import type { LayoutController } from "../controllers";
export declare type GridContextValue = {
    grid: DecoratedGrid;
    layoutController: LayoutController;
};
export declare const GridContext: import("react").Context<Partial<GridContextValue>>;
export declare const GridProvider: import("react").Provider<Partial<GridContextValue>>;
export declare const useGridContext: () => Partial<GridContextValue>;
