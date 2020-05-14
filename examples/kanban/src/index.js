/* React */
import React, {useState} from 'react';
import ReactDom from 'react-dom';
/* Muuri-react */
import {MuuriComponent, useGrid} from 'muuri-react';
/* Utils & components */
import {boardOptions, columnOptions, getRandomWord, useSend} from './utils';
import {Column, Header, Demo} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Items state.
  const [items, setItems] = useState({
    todo: ['4', '6', '5', '10'],
    working: ['1', '3', '8'],
    done: ['2', '7', '9'],
  });

  // UseSend is used when a item changes grid
  // to sync the items state.
  const onSend = useSend(setItems);

  // Children.
  const children = {
    todo: items.todo.map((id) => <Item id={id} key={id} />),
    done: items.done.map((id) => <Item id={id} key={id} />),
    working: items.working.map((id) => <Item id={id} key={id} />),
  };

  return (
    <Demo>
      <Header />
      {/* Columns container */}
      <MuuriComponent {...boardOptions}>
        {/* 'To do' column */}
        <Column actionClass="todo" title="To do">
          {/* Column content */}
          <MuuriComponent id={'TODO'} onSend={onSend} {...columnOptions}>
            {children.todo}
          </MuuriComponent>
        </Column>
        {/* 'Working' column */}
        <Column actionClass="working" title="Working">
          {/* Column content */}
          <MuuriComponent id={'WORKING'} onSend={onSend} {...columnOptions}>
            {children.working}
          </MuuriComponent>
        </Column>
        {/* 'Done' column */}
        <Column actionClass="done" title="Done">
          {/* Column content */}
          <MuuriComponent id={'DONE'} onSend={onSend} {...columnOptions}>
            {children.done}
          </MuuriComponent>
        </Column>
      </MuuriComponent>
    </Demo>
  );
};

// Item component.
// Some memoization to make the app lighter.
const Item = React.memo(({id}) => {
  // State is manteined when an item change parent.
  const [tag] = useState(getRandomWord());
  // Get the MuuriComponent parent id.
  const gridId = useGrid().id.toLowerCase();

  return (
    <div className="board-item">
      <div className="board-item-content">
        <span>Item </span>
        {`${id} - ${tag}`}
        <div className={`tab-item ${gridId}-tab-item`} />
      </div>
    </div>
  );
});

ReactDom.render(<App />, document.getElementById('root'));
