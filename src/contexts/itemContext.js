import { createContext, useContext } from "react";

// Item context.
export const ItemContext = createContext();
// Item provider.
export const ItemProvider = ItemContext.Provider;
// Item context hook.
export const useItemContext = () => useContext(ItemContext);
// Display name for react devTools.
ItemProvider.displayName = "ItemProvider";
