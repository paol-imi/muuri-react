/* React */
import React, {useState, useRef} from 'react';
import ReactDom from 'react-dom';
/* Muuri-react */
import {MuuriComponent} from 'muuri-react';
/* Utils & components */
import {generateItems, options} from './utils';
import {Select, Header, Footer, Button, Demo, Item} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Muuri instance ref.
  const muuriRef = useRef(null);

  // Items state.
  const [items, setItems] = useState(generateItems());

  // Sort state.
  const [sort, setSort] = useState({
    keys: null,
    value: 'title',
  });

  // Children.
  const children = items.map(({id, color, title, width, height}) => (
    <Item
      key={id}
      color={color}
      title={title}
      width={width}
      height={height}
      remove={() => setItems(items.filter((item) => item.id !== id))}
    />
  ));

  return (
    <Demo>
      {/* Header */}
      <Header>
        <Select
          values={[
            // Text => Value.
            ['Title (no drag)', 'title'],
            ['Color (no drag)', 'color'],
            ['Drag', 'drag'],
          ]}
          onChange={(e) => {
            // Value of the select component.
            const value = e.target.value;
            // Save the keys if in the old sort value
            // the drag was enabled.
            const keys =
              sort.value === 'drag'
                ? muuriRef.current.getItems().map((item) => item.getKey())
                : sort.keys;

            setSort({value, keys});
          }}
        />
      </Header>
      {/* Content */}
      <MuuriComponent
        {...options}
        ref={muuriRef}
        dragEnabled={sort.value === 'drag'}
        sort={sort.value === 'drag' ? sort.keys : sort.value}
        propsToData={({color, title}) => ({color, title})}>
        {children}
      </MuuriComponent>
      {/* Footer */}
      <Footer>
        <Button onClick={() => setItems(items.concat(generateItems()))} />
      </Footer>
    </Demo>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
