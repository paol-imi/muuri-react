/* React */
import React, {useState, useRef} from 'react';
import ReactDom from 'react-dom';
/* Muuri-react */
import {MuuriComponent, useGrid, useRefresh, useDrag} from 'muuri-react';
/* Utils & components */
import {generateItems, useSend, getDimensions, getOptions} from './utils';
import {Column, Header, Demo, Main, Dashboard} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  // Refs of the elements that will
  // be used as scroll containers.
  const columnRef = useRef();
  const dashboardRef = useRef();

  // Items state.
  const [items, setItems] = useState({
    dashboard: generateItems(5),
    column: generateItems(15),
  });

  // Items to children.
  const children = {
    dashboard: items.dashboard.map((item) => <Item {...item} />),
    column: items.column.map((item) => <Item {...item} />),
  };

  // onSend is used when a item changes grid
  // to sync the items state.
  const onSend = useSend(setItems);

  return (
    <Demo>
      <Header />
      {/* Main container */}
      <Main>
        {/* Column */}
        <Column ref={columnRef}>
          <MuuriComponent
            id="column"
            onSend={onSend}
            {...getOptions(columnRef, dashboardRef, 'move')}>
            {/* Column items */}
            {children.column}
          </MuuriComponent>
        </Column>
        {/* Dashboard */}
        <Dashboard ref={dashboardRef}>
          <MuuriComponent
            id="dashboard"
            onSend={onSend}
            {...getOptions(dashboardRef, columnRef, 'swap')}>
            {/* Dashboard items */}
            {children.dashboard}
          </MuuriComponent>
        </Dashboard>
      </Main>
    </Demo>
  );
};

// Item component.
const Item = React.memo(({color}) => {
  // Get the MuuriComponent parent id.
  const {grid, id} = useGrid();
  // Is dragging.
  const isDragging = useDrag();
  // Refresh the item dimensions when the
  // MuuriComponent parent changes.
  useRefresh([id]);

  // Get the style of the item,
  // it will change based on the MuuriComponent parent.
  const style = getDimensions(grid, id, isDragging);

  return (
    <div className={`${id}-item`} style={style}>
      <div className={`item-content ${color}`}>
        <div className="content-header" />
      </div>
    </div>
  );
});

ReactDom.render(<App />, document.getElementById('root'));
