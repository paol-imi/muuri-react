import type { RefObject, Key } from 'react';
import type { Flag, GridElementFiber, ItemComponentFiber } from '../interfaces';
/**
 * CONTROLLER: GRID
 *
 * The purpose of this controller is to manage the fiber node of the GridElements.
 * The Fiber nodes allow to manage reparenting and easily access new added items elements.
 */
export declare class FiberController {
    /** The fiber of the grid Element that contains all the ItemComponents. */
    _fiber: GridElementFiber;
    /** The current flag value. */
    _flag: Flag;
    /**
     * Init the controller given the grid Element ref.
     *
     * @param gridElementRef - the ref of the grid element.
     */
    useInit(gridElementRef: RefObject<HTMLElement>): void;
    /**
     * Return the DOM elements in the chosen positions.
     *
     * @param orderedIndices - The positions.
     * @returns - The elements.
     */
    getStateNodes(orderedIndices: number[]): HTMLElement[];
    /**
     * Append an itemComponent fiber
     * (the same is done for the alternate if exists).
     *
     * @param child - The item.
     */
    append(itemComponentFiber: ItemComponentFiber): void;
    /**
     * Remove an itemComponent fiber given the key of its Item
     * (The same is done for the alternate if exists).
     *
     * @param key - The key of the item.
     * @returns - The removed item.
     */
    remove(key: Key): ItemComponentFiber;
    /**
     * Return the props containing the flag value to add in the grid element.
     *
     * @returns - The props.
     */
    getFlagProp(): {
        [FlagProp]: Flag;
    };
    /**
     * Update the flag value.
     */
    updateFlag(): void;
    /**
     * Destroy the instance.
     */
    destroy(): void;
}
/**
 * The flag prop name.
 */
export declare const FlagProp = "muuri-react-flag";
