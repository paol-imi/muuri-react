import React, {useRef} from 'react';
import {useRefresh} from 'muuri-react';
import {ResizableBox} from 'react-resizable';
import {debounce} from 'underscore';

// Item component.
export const ResizableWrapper = (Component, {width, height}) => {
  // Return the wrapped resizable component.
  return function WrappedComponent(props) {
    // Muuri-react provides all the tools to manage scaling.
    // You can implement it however you want.
    const ref = useRef();
    const refresh = useRefresh();
    // Get the best performance with debouncing.
    // It is not mandatory to use.
    const refreshWithdebounce = debounce(
      () => requestAnimationFrame(refresh),
      50
    );

    return (
      <div
        ref={ref}
        className="item"
        style={{width: `${width}px`, height: `${height}px`}}>
        <div className="muuri-item">
          {/* React-resizable is used to handle the resizing. */}
          <ResizableBox
            width={width}
            height={height}
            minConstraints={[width, height]}
            onResize={(_, {size}) => {
              ref.current.style.width = size.width + 'px';
              ref.current.style.height = size.height + 'px';

              refreshWithdebounce();
            }}>
            <Component {...props} />
          </ResizableBox>
        </div>
      </div>
    );
  };
};

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Grid Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Resize the boxes</h4>
      </div>
    </h4>
    <div className="controls cf" />
  </React.Fragment>
);

// Demo component.
export const Demo = ({children}) => (
  <section className="grid-demo">{children}</section>
);

// Button component.
export const Button = ({onClick}) => (
  <button className="add-more-items btn btn-primary" onClick={onClick}>
    <i className="material-icons">&#xE145;</i>
    Add more items
  </button>
);

// Footer component.
export const Footer = ({children}) => (
  <div className="grid-footer">{children}</div>
);
