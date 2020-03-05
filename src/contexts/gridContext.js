import { createContext, useContext } from "react";

// Grid context.
export const GridContext = createContext();
// Grid provider.
export const GridProvider = GridContext.Provider;
// Grid context hook.
export const useGridContext = () => useContext(GridContext);
// Display name for react devTools.
GridProvider.displayName = "GridProvider";
