import React, {useState} from 'react';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {useGrid} from '../../src';

// Item that re-render on reparenting.
export const ReparentingResponsiveItem = React.memo(({id, state}) => {
  const grid = useGrid().id;
  return (
    <div id={id} state={state} grid={grid} className="item">
      <div className="item-content" />
    </div>
  );
});

// ReparentingResponsiveItem with state wrap.
export const Item = ({id}) => {
  const [state] = useState(getRandomWord());
  return <ReparentingResponsiveItem state={state} id={id} />;
};

// Component that accept a list of ids
// And generate items with those ids.
export const App = ({ids, ...props}) => (
  <MuuriComponent {...props} dragEnabled>
    {ids.map((id) => (
      <Item key={id} id={id} />
    ))}
  </MuuriComponent>
);

// Return one of the values of the array.
export function oneOf(array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
}

// Return a random word.
export function getRandomWord() {
  return (
    oneOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ') + oneOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  );
}
