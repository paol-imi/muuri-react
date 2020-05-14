import React from 'react';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {withHooks} from '../../src';

// Simple item.
export const Item = ({id, title}) => (
  <div id={id} className="item">
    <div className="item-content">{title}</div>
  </div>
);

// Item that use its props as data.
export const ItemUseData = withHooks(
  ({id, title, setData}) => {
    setData({id, title});
    return <Item id={id} title={title} />;
  },
  ['useData']
);

// Hidden item.
export const HiddenItem = withHooks(
  ({setVisibility, setVisibilityRef, ...props}) => {
    setVisibilityRef.current = setVisibility;
    return <Item {...props} />;
  },
  ['useVisibility']
);

// Item that re-render when its visibility change.
export const VisibilityResponsiveItem = React.memo(
  withHooks(
    ({onRender, ...props}) => {
      onRender();
      return <Item {...props} />;
    },
    ['useShow']
  )
);

// Component that accept a list of ids
// And generate items with those ids.
export const App = ({ids = [], ...props}) => {
  return (
    <MuuriComponent hideDuration={0} propsToData={({id}) => ({id})} {...props}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
    </MuuriComponent>
  );
};
