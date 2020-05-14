/// <reference types="react" />
import type { ItemRefController, EventController } from '../controllers';
export declare type ItemContextValue = {
    itemRefController: ItemRefController;
    eventController: EventController;
};
export declare const ItemContext: import("react").Context<Partial<ItemContextValue>>;
export declare const ItemProvider: import("react").Provider<Partial<ItemContextValue>>;
export declare const useItemContext: () => Partial<ItemContextValue>;
