/* React */
import React, {useState} from 'react';
import ReactDom from 'react-dom';
/* Muuri react */
import {MuuriComponent, useRefresh} from 'muuri-react';
/* Utils & components */
import {add, generateItems, changeSize} from './utils';
import {Header, Footer, Button, Demo} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Items state.
  const [items, setItems] = useState(generateItems());
  // Children.
  const children = items.map((props) => <Item key={props.id} {...props} />);

  return (
    <Demo>
      <Header />
      <MuuriComponent>{children}</MuuriComponent>
      <Footer>
        <Button onClick={() => setItems(add)} />
      </Footer>
    </Demo>
  );
};

// Item component.
const Item = ({color, width, height, title}) => {
  const [size, setSize] = useState({width, height});
  const onMouseUp = () => setSize(changeSize);

  // Each time the dependency change the grid size is updated.
  useRefresh([size]);

  return (
    <div
      className={`item h${size.height} w${size.width} ${color}`}
      onMouseUp={onMouseUp}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
