import React from 'react';
import {mount} from '../__shared__/mount';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {muuriMap} from '../../src';

beforeEach(() => {
  muuriMap.clear();
});

describe('How the muuri-map works', () => {
  test('How the muuri-map link the grid instances with the id', () => {
    const {wrapper, grid} = mount(<MuuriComponent id="A" />);

    expect(muuriMap.get('A')).toEqual(grid);
    expect(muuriMap.get('B')).toEqual(null);

    wrapper.unmount();

    expect(muuriMap.get('A')).toEqual(null);
  });

  test('How the muuri-map link the grid instances with the group ids', () => {
    const {wrapper, grid} = mount(<MuuriComponent groupIds={['A', 'B']} />);

    const groupA = muuriMap.getGroup('A');
    const groupB = muuriMap.getGroup('B');

    expect(grid.getGroupIds()).toEqual(['A', 'B']);
    expect(groupA).toEqual([grid]);
    expect(groupB).toEqual([grid]);

    wrapper.setProps({groupIds: ['A']});

    expect(grid.getGroupIds()).toEqual(['A']);
    expect(groupA).toEqual([grid]);
    expect(groupB).toEqual([]);

    wrapper.unmount();

    expect(groupA).toEqual([]);
  });
});
