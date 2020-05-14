import React from 'react';

// Demo component.
export const Demo = ({children}) => {
  return <section className="grid-demo">{children}</section>;
};

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Grid Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Drag a box</h4>
      </div>
    </h4>
  </React.Fragment>
);
