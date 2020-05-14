import React from 'react';
import {mount} from '../__shared__/mount';
import {MuuriComponent} from '../__shared__/muuriComponent';

describe('How and when the internal methods of Muuri are called', () => {
  test('How and when sort() and layout() are called', () => {
    const onSort = jest.fn();
    const onLayout = jest.fn();

    const {wrapper, grid} = mount(<MuuriComponent />);
    grid.layout = onLayout;
    grid.sort = onSort;

    wrapper.setProps({sort: 'a'});
    expect(onSort.mock.calls.length).toBe(1);
    expect(onLayout.mock.calls.length).toBe(1);

    wrapper.setProps({sort: 'a'});
    expect(onSort.mock.calls.length).toBe(1);
    expect(onLayout.mock.calls.length).toBe(1);

    wrapper.setProps({sort: 'b'});
    expect(onSort.mock.calls.length).toBe(2);
    expect(onLayout.mock.calls.length).toBe(2);

    wrapper.setProps({sort: 'b', sortOptions: {descending: true}});
    expect(onSort.mock.calls.length).toBe(3);
    expect(onLayout.mock.calls.length).toBe(3);

    wrapper.setProps({sort: null});
    expect(onSort.mock.calls.length).toBe(3);
    expect(onLayout.mock.calls.length).toBe(3);
  });

  test('How and when filter() and layout() are called', () => {
    const onFilter = jest.fn();
    const onLayout = jest.fn();

    const {wrapper, grid} = mount(<MuuriComponent />);
    grid.layout = onLayout;
    grid.filter = onFilter;

    const aFilter = () => {};
    const anotherFilter = () => {};

    wrapper.setProps({filter: aFilter});
    expect(onFilter.mock.calls.length).toBe(1);
    expect(onLayout.mock.calls.length).toBe(1);

    wrapper.setProps({filter: aFilter});
    expect(onFilter.mock.calls.length).toBe(1);
    expect(onLayout.mock.calls.length).toBe(1);

    wrapper.setProps({filter: anotherFilter});
    expect(onFilter.mock.calls.length).toBe(2);
    expect(onLayout.mock.calls.length).toBe(2);

    wrapper.setProps({filter: null});
    expect(onFilter.mock.calls.length).toBe(2);
    expect(onLayout.mock.calls.length).toBe(2);
  });
});
