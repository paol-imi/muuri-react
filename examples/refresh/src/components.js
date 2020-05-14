import React from 'react';

// Button component.
export const Button = ({onClick}) => (
  <button className="add-more-items btn btn-primary" onClick={onClick}>
    <i className="material-icons">&#xE145;</i>
    Add more items
  </button>
);

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Grid Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Click on a box to resize it</h4>
      </div>
    </h4>
    <div className="controls cf" />
  </React.Fragment>
);

// Footer component.
export const Footer = ({children}) => (
  <div className="grid-footer">{children}</div>
);

// Demo component.
export const Demo = ({children}) => (
  <section className="grid-demo">{children}</section>
);
