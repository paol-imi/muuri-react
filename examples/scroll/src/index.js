/* React */
import React, {useRef} from 'react';
import ReactDom from 'react-dom';
/* Muuri react */
import {MuuriComponent, AutoScroller} from 'muuri-react';
/* Utils & components */
import {emojis} from './utils';
import {Header, Demo, Scroll} from './components';
/* Style */
import './style.css';

// App.
const App = () => {
  const scrollElemRef = useRef();
  // Children.
  const children = emojis.map((emoji) => <Item key={emoji} emoji={emoji} />);

  return (
    <Demo>
      <Header />
      <Scroll ref={scrollElemRef}>
        <MuuriComponent
          dragEnabled
          layout={{horizontal: true}}
          layoutEasing={'ease-out'}
          dragRelease={{
            duration: 140,
            easing: 'ease-out',
          }}
          dragSortHeuristics={{
            sortInterval: 0,
          }}
          dragContainer={document.body}
          dragAutoScroll={{
            targets: [
              {
                element: scrollElemRef,
                axis: AutoScroller.AXIS_X,
              },
            ],
          }}>
          {children}
        </MuuriComponent>
      </Scroll>
    </Demo>
  );
};

// Item component.
const Item = ({emoji}) => (
  <div className="item">
    <div className="item-content">{emoji}</div>
  </div>
);

ReactDom.render(<App />, document.getElementById('root'));
