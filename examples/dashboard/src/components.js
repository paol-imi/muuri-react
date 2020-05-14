import React, {forwardRef} from 'react';

// Column container.
export const Column = forwardRef(({children}, ref) => (
  <div ref={ref} className="column">
    {children}
  </div>
));

// Dashboard container.
export const Dashboard = forwardRef(({children}, ref) => (
  <div ref={ref} className="dashboard">
    {children}
  </div>
));

// Main container.
export const Main = ({children}) => <div className="main">{children}</div>;

// Demo container.
export const Demo = ({children}) => (
  <section className="grid-demo">{children}</section>
);

// Header component.
export const Header = () => (
  <React.Fragment>
    <h2 className="section-title">
      <span>Grid Demo</span>
    </h2>
    <h4 className="section-title">
      <div>
        <h4>Resize the window to make the dashboard smaller</h4>
      </div>
    </h4>
  </React.Fragment>
);
