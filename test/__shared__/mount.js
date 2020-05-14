import React from 'react';
import {mount} from 'enzyme';

const wrappedMount = (element) => {
  const gridRef = React.createRef();
  const itemsRef = React.createRef();
  const DOMItemsRef = React.createRef();

  const wrapper = mount(
    React.cloneElement(element, {
      ...element.props,
      itemsRef,
      DOMItemsRef,
      gridRef,
    })
  );

  const grid = gridRef.current;
  const items = itemsRef.current;
  const DOMItems = DOMItemsRef.current;
  const muuriWrapper = wrapper.find('MuuriComponent');
  const itemsWrapper = muuriWrapper.find('Item');

  return {
    wrapper,
    muuriWrapper,
    itemsWrapper,
    grid,
    items,
    DOMItems,
  };
};

export {wrappedMount as mount};
