import React, { Children, forwardRef } from "react";
import PropTypes from "prop-types";
import { ItemWrapper } from "./itemWrapper";

// Grid component
export const GridComponent = forwardRef(function GridComponent(
  { children, gridProps = {} },
  gridElemRef
) {
  return (
    <div {...gridProps} ref={gridElemRef}>
      {Children.map(children, (child, index) => (
        <ItemWrapper key={child.key} index={index}>
          {child}
        </ItemWrapper>
      ))}
    </div>
  );
});

GridComponent.propTypes = {
  gridProps: PropTypes.object
};
