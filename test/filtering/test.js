import React from 'react';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {mount} from '../__shared__/mount';
import {
  App,
  Item,
  ItemUseData,
  HiddenItem,
  VisibilityResponsiveItem,
} from './components';

const flushPromises = () => new Promise((r) => setTimeout(r, 0));

describe('How items are filtered', () => {
  test('The items are sorted correctly using a function as predicate (propsToData)', () => {
    const data = [{id: '2'}, {id: '1'}, {id: '3'}];

    const {wrapper, DOMItems} = mount(
      <MuuriComponent hideDuration={0} propsToData={({id}) => ({id})}>
        {data.map((item) => (
          <Item key={item.id} id={item.id} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({
      filter: (data) => data.id !== '2',
    });

    expect(DOMItems.map((DOMItem) => DOMItem.style.display)).toEqual([
      'none',
      'block',
      'block',
    ]);
  });

  test('The items are sorted correctly using a function as predicate (useData)', () => {
    const data = [{id: '2'}, {id: '1'}, {id: '3'}];

    const {wrapper, DOMItems} = mount(
      <MuuriComponent hideDuration={0}>
        {data.map((item) => (
          <ItemUseData key={item.id} id={item.id} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({
      filter: (data) => data.id !== '2',
    });
    expect(DOMItems.map((DOMItem) => DOMItem.style.display)).toEqual([
      'none',
      'block',
      'block',
    ]);
  });

  test('Adding an element the filtering is updated', () => {
    const {wrapper, DOMItems} = mount(<App />);
    const memoizedFilter = (data) => data.id !== '2';

    wrapper.setProps({ids: ['3', '1'], filter: memoizedFilter});
    expect(DOMItems.map((DOMItem) => DOMItem.style.display)).toEqual([
      'block',
      'block',
    ]);
    wrapper.setProps({ids: ['2', '3', '1'], filter: memoizedFilter});
    expect(DOMItems.map((DOMItem) => DOMItem.style.display)).toEqual([
      'none',
      'block',
      'block',
    ]);
  });
});

describe('How <HiddenItem> interact with filtering', () => {
  test('The component is hidden when it is added', () => {
    const setVisibilityRef = React.createRef();

    const {DOMItems} = mount(
      <MuuriComponent hideDuration={0}>
        <HiddenItem key="1" id="1" setVisibilityRef={setVisibilityRef} />
      </MuuriComponent>
    );

    expect(DOMItems.findById('1').style.display).toBe('block');
    setVisibilityRef.current(false);
    expect(DOMItems.findById('1').style.display).toBe('none');
  });

  test('The filter has priority over the visibility of the item ', async () => {
    const setVisibilityRef = React.createRef();

    const {wrapper, DOMItems} = mount(
      <MuuriComponent hideDuration={0}>
        <HiddenItem key="1" id="1" setVisibilityRef={setVisibilityRef} />
      </MuuriComponent>
    );

    expect(DOMItems.findById('1').style.display).toBe('block');
    setVisibilityRef.current(false);
    wrapper.setProps({filter: () => true});
    expect(DOMItems.findById('1').style.display).toBe('block');
  });
});

describe('How <VisibilityResponsiveItem> interact with filtering', () => {
  test('The component re-render when its visibility change', async () => {
    const onRender = jest.fn();

    const {wrapper} = mount(
      <MuuriComponent hideDuration={0}>
        <VisibilityResponsiveItem key="1" onRender={onRender} />
      </MuuriComponent>
    );

    expect(onRender.mock.calls.length).toBe(1);

    wrapper.setProps({filter: () => true}, async () => {
      await flushPromises();
      expect(onRender.mock.calls.length).toBe(2);
    });

    wrapper.setProps({filter: () => false}, async () => {
      await flushPromises();
      expect(onRender.mock.calls.length).toBe(3);
    });
  });
});
