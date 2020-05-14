import {invariant} from '../../invariant';
import type {GridProps} from '../../interfaces';
import type {MuuriMap} from '../../muuri-map';

/**
 * Wrap the 'dragSort' option.
 * Allow it to be an object containing the groupId of the chosen MuuriComponents.
 *
 * @param options - The grid options.
 * @param globalMap - The globalMap.
 */
export function setDragSort(options: GridProps, globalMap: MuuriMap): void {
  const {dragSort} = options;
  // Parse this options only if it is an object.
  if (!dragSort || typeof dragSort !== 'object') return;
  // Check the options.
  invariant(
    typeof dragSort.groupId === 'string',
    'You must provide a string as groupId'
  );

  // The group, its reference doesn't change.
  const group = globalMap.getGroup(dragSort.groupId);

  // dragSort method.
  options.dragSort = () => group;
}
