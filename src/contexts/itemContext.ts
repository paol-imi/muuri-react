import {createContext, useContext} from 'react';
import type {ItemRefController, EventController} from '../controllers';

// Context value shape.
export type ItemContextValue = {
  itemRefController: ItemRefController;
  eventController: EventController;
};

// Item context.
export const ItemContext = createContext<Partial<ItemContextValue>>({});
// Item provider.
export const ItemProvider = ItemContext.Provider;
// Item context hook.
export const useItemContext = () => useContext(ItemContext);
// Item provider display name.
ItemContext.displayName = 'ItemProvider';
