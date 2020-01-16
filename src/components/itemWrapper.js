import { useEffect } from "react";
import PropTypes from "prop-types";
import { setConsumer, deleteConsumer } from "../hooks/global";

// Item wrapper
export const ItemWrapper = ({ children, index }) => {
  setConsumer(index);
  // Because the use cases
  // of the muuri component the consumers could be all deleted deleted
  // after the mounting of the muuri component
  useEffect(() => {
    deleteConsumer();
  });

  return children;
};

ItemWrapper.propTypes = {
  index: PropTypes.number
};
