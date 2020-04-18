import type { GridProps } from "../../interfaces";
import type { MuuriMap } from "../../muuri-map";
/**
 * Wrap the 'dragSort' option.
 * Allow it to be an object containing the groupId of the chosen MuuriComponents.
 *
 * @param options - The grid options.
 * @param globalMap - The globalMap.
 */
export declare function setDragSort(options: GridProps, globalMap: MuuriMap): void;
