import React from 'react';
import {mount} from '../__shared__/mount';
import {App} from './components';

describe('How items are added and removed', () => {
  test('The <item>s components are added and removed correctly', () => {
    const {wrapper} = mount(<App ids={['1', '2', '3']} />);

    expect(wrapper.find('Item').map((Item) => Item.props().id)).toEqual([
      '1',
      '2',
      '3',
    ]);
    wrapper.setProps({ids: ['1', '2', '3', '4']});
    expect(wrapper.find('Item').map((Item) => Item.props().id)).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
    wrapper.setProps({ids: ['1', '2', '4']});
    expect(wrapper.find('Item').map((Item) => Item.props().id)).toEqual([
      '1',
      '2',
      '4',
    ]);
    wrapper.setProps({ids: ['5', '1', '6', '7']});
    expect(wrapper.find('Item').map((Item) => Item.props().id)).toEqual([
      '5',
      '1',
      '6',
      '7',
    ]);
    wrapper.setProps({ids: ['5', '8', '7']});
    expect(wrapper.find('Item').map((Item) => Item.props().id)).toEqual([
      '5',
      '8',
      '7',
    ]);
  });

  test('The items instances are added and removed correctly', () => {
    const {wrapper, items} = mount(<App ids={['1', '2', '3']} />);

    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
    wrapper.setProps({ids: ['1', '2', '3', '4']});
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3', '4']);
    wrapper.setProps({ids: ['1', '2', '4']});
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '4']);
    wrapper.setProps({ids: ['5', '1', '6', '7']});
    expect(items.map((item) => item.props().id)).toEqual(['5', '1', '6', '7']);
    wrapper.setProps({ids: ['5', '8', '7']});
    expect(items.map((item) => item.props().id)).toEqual(['5', '8', '7']);
  });

  test('The DOM elements of the components are added and removed correctly', () => {
    const {wrapper} = mount(<App ids={['1', '2', '3']} />);

    expect(
      wrapper.find('.item').map((item) => item.getDOMNode().getAttribute('id'))
    ).toEqual(['1', '2', '3']);
    wrapper.setProps({ids: ['1', '2', '3', '4']});
    expect(
      wrapper.find('.item').map((item) => item.getDOMNode().getAttribute('id'))
    ).toEqual(['1', '2', '3', '4']);
    wrapper.setProps({ids: ['1', '2', '4']});
    expect(
      wrapper.find('.item').map((item) => item.getDOMNode().getAttribute('id'))
    ).toEqual(['1', '2', '4']);
    wrapper.setProps({ids: ['5', '1', '6', '7']});
    expect(
      wrapper.find('.item').map((item) => item.getDOMNode().getAttribute('id'))
    ).toEqual(['5', '1', '6', '7']);
    wrapper.setProps({ids: ['5', '8', '7']});
    expect(
      wrapper.find('.item').map((item) => item.getDOMNode().getAttribute('id'))
    ).toEqual(['5', '8', '7']);
  });

  test('The Items can be accessed correctly', () => {
    const {grid} = mount(<App ids={['1', '2', '3']} />);

    // TODO: uncomment when Muuri 0.9.0 will be released.
    // const itemA = grid.getItem(0);
    // const itemB = grid.getItem("1");
    const itemsA = grid.getItems([1, 2]);
    const itemsB = grid.getItems(['2', '3']);

    // expect(itemA.getKey()).toBe("1");
    // expect(itemA).toBe(itemB);
    expect(itemsA).toEqual(itemsB);
  });
});
