/* React */
import React, {useState, useContext, useMemo} from 'react';
import ReactDom from 'react-dom';
/* Muuri react */
import {MuuriComponent, getResponsiveStyle} from 'muuri-react';
import {useMediaQuery} from 'react-responsive';
/* Utils & components */
import {generateItems, ThemeContext} from './utils';
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
      <ThemeProvider>
        <MuuriComponent
          dragEnabled
          dragFixed
          dragSortPredicate={{
            action: 'swap',
          }}
          dragSortHeuristics={{
            sortInterval: 0,
          }}>
          {children}
        </MuuriComponent>
      </ThemeProvider>
    </Demo>
  );
};

// Responsive theme provider.
const ThemeProvider = ({children}) => {
  const isBigScreen = useMediaQuery({
    query: '(min-width: 824px)',
  });

  // Memoize the style.
  const style = useMemo(() => {
    return getResponsiveStyle({
      columns: isBigScreen ? 1 / 4 : 1 / 3,
      margin: '1%',
      ratio: 2,
    });
  }, [isBigScreen]);

  return (
    <ThemeContext.Provider value={style}>{children}</ThemeContext.Provider>
  );
};

// Item component.
const Item = ({color, title}) => {
  // The style concerns only the "dimensions" and "margins" of the items.
  const style = useContext(ThemeContext);

  return (
    <div style={style} className={`item ${color}`}>
      <div className="item-content">{title}</div>
    </div>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
