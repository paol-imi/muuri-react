import React from 'react';
import {MuuriComponent} from '../__shared__/muuriComponent';

// Simple item.
export const Item = ({id}) => (
  <div id={id} className="item">
    <div className="item-content" />
  </div>
);

// Component that accept a list of ids
// And generate items with those ids.
export const App = ({ids, ...props}) => {
  return (
    <MuuriComponent {...props}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
    </MuuriComponent>
  );
};
