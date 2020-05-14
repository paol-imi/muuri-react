/* React */
import React, {useState} from 'react';
import ReactDom from 'react-dom';
/* Muuri-react */
import {MuuriComponent} from 'muuri-react';
/* Utils & components */
import {Header, Demo, Footer, Button, ResizableWrapper} from './components';
import {generateItems} from './utils';
/* Style */
import './style.css';

// App.
const App = () => {
  const [items, setItems] = useState(generateItems());

  // Children.
  const children = items.map(({id, color}) => <Item key={id} color={color} />);

  return (
    <Demo>
      {/* Header */}
      <Header />
      {/* Content */}
      <MuuriComponent dragEnabled dragHandle=".content-header">
        {children}
      </MuuriComponent>
      {/* Footer */}
      <Footer>
        <Button onClick={() => setItems(items.concat(generateItems()))} />
      </Footer>
    </Demo>
  );
};

// Item component.
const Item = ResizableWrapper(
  ({color}) => (
    <div className={`content ${color}`}>
      <div className="content-header" />
    </div>
  ),
  {
    width: 100,
    height: 100,
  }
);

ReactDom.render(<App />, document.getElementById('root'));
