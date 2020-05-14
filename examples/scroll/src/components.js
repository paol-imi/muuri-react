import React, {forwardRef} from 'react';

// Button component.
export const Scroll = forwardRef(({children}, ref) => (
  <div className="scrollElem" ref={ref}>
    {children}
  </div>
));

// Header component.
export const Header = () => (
  <h2 className="section-title">
    <span>Horizontal list</span>
  </h2>
);

// Demo component.
export const Demo = ({children}) => (
  <section className="grid-demo">{children}</section>
);
