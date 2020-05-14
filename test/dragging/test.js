import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount} from '../__shared__/mount';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {Item, DragResponsiveItem, NonDraggableItem} from './components';

describe('How <Item> interacts with drag', () => {
  test('The css drag class is applied correctly with the drag event', () => {
    const {itemsWrapper, items} = mount(
      <MuuriComponent dragEnabled>
        <Item key="1" />
      </MuuriComponent>
    );

    expect(itemsWrapper.render().hasClass('muuri-item-dragging')).toBeFalsy();
    items.findByKey('1').simulateDrag();
    expect(itemsWrapper.render().hasClass('muuri-item-dragging')).toBeTruthy();
    items.findByKey('1').simulateRelease();
    expect(itemsWrapper.render().hasClass('muuri-item-dragging')).toBeFalsy();
  });

  test('The component is not dragged with the drag event since dragging is disabled', () => {
    const {itemsWrapper, items} = mount(
      <MuuriComponent dragEnabled={false}>
        <Item key="1" />
      </MuuriComponent>
    );

    expect(itemsWrapper.render().hasClass('muuri-item-dragging')).toBeFalsy();
    items.findByKey('1').simulateDrag();
    expect(itemsWrapper.render().hasClass('muuri-item-dragging')).toBeFalsy();
  });
});

describe('How <DragResponsiveItem> interacts with drag', () => {
  test('The component re-render with the drag event', () => {
    const onRender = jest.fn();

    const {items} = mount(
      <MuuriComponent dragEnabled>
        <DragResponsiveItem onRender={onRender} key="1" />
      </MuuriComponent>
    );

    expect(onRender.mock.calls.length).toBe(1);
    act(() => {
      items.findByKey('1').simulateDrag();
    });
    expect(onRender.mock.calls.length).toBe(2);
  });

  test('The component is not dragged with the drag event since dragging is disabled', () => {
    const onRender = jest.fn();

    const {items} = mount(
      <MuuriComponent dragEnabled={false}>
        <DragResponsiveItem onRender={onRender} key="1" />
      </MuuriComponent>
    );

    expect(onRender.mock.calls.length).toBe(1);
    act(() => {
      items.findByKey('1').simulateDrag();
    });
    expect(onRender.mock.calls.length).toBe(1);
  });
});

describe('How <NonDraggableItem> interacts with drag', () => {
  test('The component is not dragged with the drag event since its dragging is disabled', () => {
    const onRender = jest.fn();

    const {items} = mount(
      <MuuriComponent dragEnabled>
        <NonDraggableItem onRender={onRender} key="1" />
      </MuuriComponent>
    );

    expect(onRender.mock.calls.length).toBe(1);
    act(() => {
      items.findByKey('1').simulateDrag();
    });
    expect(onRender.mock.calls.length).toBe(1);
  });
});
