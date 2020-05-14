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

// Component that accept a list of ids
// And generate items with those ids.
export const App = ({ids = [], ...props}) => {
  return (
    <MuuriComponent propsToData={({id}) => ({id})} {...props}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
    </MuuriComponent>
  );
};
