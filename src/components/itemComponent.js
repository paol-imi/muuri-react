/* React */
import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
/* Context */
import { ItemProvider } from "../contexts";
/* Controllers */
import { EventController, ItemRefController } from "../controllers";
/* Utils */
import { decorateItem, decorateDOMItem } from "../utils/decorators";

// Item component.
export const ItemComponent = ({
  children: child,
  itemController,
  propsToData
}) => {
  // The value provided doesn't change the reference.
  const value = useMemo(
    () => {
      // Create the controllers.
      const eventController = new EventController();
      const itemRefController = new ItemRefController();
      // Add the data that won't change.
      itemRefController.set("key", child.key);
      itemRefController.set("eventController", eventController);
      // Return the controllers.
      return { eventController, itemRefController };
    },
    [] // eslint-disable-line
  );

  // Set the props.
  value.itemRefController.set("props", child.props);

  // Set the data.
  if (propsToData) {
    // Get the data.
    const data = propsToData(child.props);

    // Must be an object.
    if (typeof data !== "object")
      throw new Error("The data returned by 'propsToData' must be an object.");

    // Set the data.
    value.itemRefController.set("data", data);
  }

  // Called in useEffect to run it only on mount.
  useEffect(() => {
    // Set the item.
    itemController.requestItem(item => {
      decorateItem(item);
      decorateDOMItem(item.getElement());
      value.itemRefController.setItem(item);
    });

    // If the item is going to be unmounted
    // and it is being dragged it have to end the event
    // (Because it could be child of a different DOM element).
    return () => {
      const item = value.itemRefController.getItem();
      const grid = item.getGrid();

      // Remove the item.
      if (grid) {
        grid._component.removeController.removeItem(item);
      }

      // Stop the event.
      if (item.isDragging()) {
        item._drag.stop();
      }
    };
  }, []); // eslint-disable-line

  // Render.
  return <ItemProvider value={value}>{child}</ItemProvider>;
};

ItemComponent.propTypes = {
  itemController: PropTypes.any.isRequired,
  propsToData: PropTypes.func,
  children: PropTypes.any.isRequired
};

ItemComponent.displayName = "ItemComponent";
