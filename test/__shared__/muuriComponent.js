import React, {forwardRef} from 'react';
import Muuri from 'muuri';
import {MuuriComponent} from '../../src';
import {Items, DOMItems} from './items';

Muuri.ItemDrag.defaultStartPredicate = () => true;

delete Muuri.defaultOptions.dragStartPredicate.handle;
delete Muuri.defaultOptions.dragPlaceholder.easing;
delete Muuri.defaultOptions.dragPlaceholder.duration;

const WrappedMuuriComponent = forwardRef(
  ({children, itemsRef, DOMItemsRef, gridRef, ...props}, ref) => (
    <MuuriComponent
      {...props}
      ref={ref}
      onMount={(grid) => {
        if (itemsRef) itemsRef.current = new Items(grid);
        if (DOMItemsRef) DOMItemsRef.current = new DOMItems(grid);
        if (gridRef) gridRef.current = grid;
      }}>
      {children}
    </MuuriComponent>
  )
);

export {WrappedMuuriComponent as MuuriComponent};
