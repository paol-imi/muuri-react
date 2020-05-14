/* React */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
/** Muuri */
import Muuri from 'muuri';
/* Context */
import {ItemProvider} from '../contexts';
/* Controllers */
import {EventController, ItemRefController} from '../controllers';
/* Utils */
import {fillItem, fillItemElement} from '../utils/fillers';
import {useMemoized} from '../utils/hooks';
import {invariant} from '../invariant';
/** Interfaces */
import type {ItemComponentProps} from '../interfaces';

// Item component.
export function ItemComponent({
  children: child,
  itemClasses,
  itemAddController,
  itemRemoveController,
  propsToData,
  itemKey,
  grid,
}: ItemComponentProps) {
  // The store provided doesn't change the reference.
  const store = useMemoized(() => {
    // Create the controllers.
    const eventController = new EventController();
    const itemRefController = new ItemRefController();
    // Add the data that won't change.
    itemRefController.set('key', itemKey);
    itemRefController.set('eventController', eventController);
    // Return the controllers.
    return {eventController, itemRefController, itemRemoveController, grid};
  });

  // Set the props.
  store.itemRefController.set('props', child.props);
  store.itemRemoveController = itemRemoveController;
  store.grid = grid;

  // Set the data.
  if (propsToData) {
    // Get the data.
    const data = propsToData(child.props);

    // Must be an object.
    invariant(
      typeof data === 'object',
      `The data returned by 'propsToData' must be an object, founded ${typeof data}`
    );

    // Set the data.
    store.itemRefController.set('data', data);
  }

  // On mount.
  useEffect(() => {
    // Request the item.
    itemAddController.requestItem((item) => {
      fillItem(item);
      // @ts-ignore
      fillItemElement(item.getElement(), itemClasses);
      store.itemRefController.setItem(item);
    });

    return () => {
      // The item.
      const item = store.itemRefController.getItem();
      invariant(item !== null);

      // The element.
      const element = item.getElement();
      invariant(element !== undefined);

      // If the item is going to be unmounted
      // and it is being dragged it have to end the event
      // (Because it could be child of a different DOM element).
      if (item.isDragging()) {
        element.style.display = 'none';
        element.style.visibility = 'hidden';

        // @ts-ignore
        if (item._drag) item._drag.destroy();
        store.grid.getElement().appendChild(element);
      }

      // Remove the item.
      store.itemRefController.delete();
      store.itemRemoveController.removeItem(item);

      // Destroy the controllers instances.
      store.itemRefController.destroy();
      store.eventController.destroy();
    };
  }, []); // eslint-disable-line

  // Render.
  return <ItemProvider value={store}>{child}</ItemProvider>;
}

// PropTypes.
ItemComponent.propTypes = {
  itemAddController: PropTypes.object.isRequired,
  itemClasses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  propsToData: PropTypes.func,
  children: PropTypes.element.isRequired,
  grid: PropTypes.instanceOf(Muuri).isRequired,
};

// Display name.
ItemComponent.displayName = 'ItemComponent';
