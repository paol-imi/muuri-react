/* React */
import React, {useState} from 'react';
import ReactDom from 'react-dom';
/* Muuri react */
import {MuuriComponent, useDrag} from 'muuri-react';
/* Utils & components */
import {generateItems} from './utils';
import {Header, Demo} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Items state.
  const [items] = useState(generateItems());
  // Items to children.
  const children = items.map((props) => <Item key={props.id} {...props} />);

  return (
    <Demo>
      <Header />
      <MuuriComponent dragEnabled>{children}</MuuriComponent>
    </Demo>
  );
};

// Item component.
const Item = ({color, width, height, title}) => {
  // Add a shadow when the item is dragging.
  const isDragging = useDrag();
  // Based on isDragging.
  const shadow = isDragging ? 'shadow' : '';
  const cardTitle = isDragging ? 'Release me!' : title;

  return (
    <div className={`item h${height} w${width} ${color} ${shadow}`}>
      <div className="item-content">{cardTitle}</div>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
