import React from "react";

// Column component.
export const Column = ({ children, actionClass, title }) => (
  <div className={"board-column " + actionClass}>
    <div className="board-column-header">{title}</div>
    {children}
  </div>
);

// Demo component.
export const Demo = ({ children }) => (
  <section className="grid-demo">{children}</section>
);

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Kanban Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Drag the items to another list</h4>
      </div>
    </h4>
  </React.Fragment>
);
