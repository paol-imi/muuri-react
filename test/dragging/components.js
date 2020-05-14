import React from 'react';
import {withHooks} from '../../src';

// Simple item.
export const Item = () => (
  <div className="item">
    <div className="item-content" />
  </div>
);

// Item that re-render when it is dragged.
export const DragResponsiveItem = withHooks(
  ({onRender, ...props}) => {
    onRender();
    return <Item {...props} />;
  },
  ['useDrag']
);

// Item that can't be dragged.
export const NonDraggableItem = withHooks(
  ({setDraggable, ...props}) => {
    setDraggable(false);
    return <DragResponsiveItem {...props} />;
  },
  ['useDraggable']
);
