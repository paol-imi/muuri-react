/* React */
import React, {useState} from 'react';
import ReactDom from 'react-dom';
/* Muuri-react */
import {MuuriComponent} from 'muuri-react';
/* Utils & components */
import {useFilter, generateItems, options} from './utils';
import {Select, Header, Footer, Button, Input, Demo} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Items state.
  const [items, setItems] = useState(generateItems());

  // Sort state.
  const [sort, setSort] = useState({
    value: 'title',
  });

  // Filter state.
  const [filter, setFilter] = useState({
    search: '',
    value: 'all',
  });

  // Filter method.
  const filterFunction = useFilter(filter.value, filter.search);

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
        <Input
          onKeyUp={(e) => setFilter({...filter, search: e.target.value})}
        />
        <Select
          values={['All', 'Red', 'Blue', 'Green']}
          onChange={(e) => setFilter({...filter, value: e.target.value})}
        />
        <Select
          values={['Title', 'Color']}
          onChange={(e) => setSort({...sort, value: e.target.value})}
        />
      </Header>
      {/* Content */}
      <MuuriComponent
        {...options}
        propsToData={({color, title}) => ({color, title})}
        filter={filterFunction}
        sort={sort.value}>
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
const Item = ({color, width, height, title, remove}) => {
  return (
    <div className={`item h${height} w${width} ${color}`}>
      <div className="item-content">
        <div className="card">
          <div className="card-title">{title}</div>
          <div className="card-remove">
            <i className="material-icons" onMouseDown={remove}>
              &#xE5CD;
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
