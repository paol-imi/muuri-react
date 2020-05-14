import React from 'react';
import {MuuriComponent} from '../__shared__/muuriComponent';
import {mount} from '../__shared__/mount';
import {App, Item, ItemUseData} from './components';

describe('How items are sorted', () => {
  test('The items are sorted correctly using a string as predicate (propsToData)', () => {
    const data = [
      {id: '2', title: 'A'},
      {id: '1', title: 'B'},
      {id: '3', title: 'A'},
    ];

    const {wrapper, items} = mount(
      <MuuriComponent propsToData={({id, title}) => ({id, title})}>
        {data.map((item) => (
          <Item key={item.id} id={item.id} title={item.title} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({sort: 'id'});
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
    wrapper.setProps({sort: 'title id'});
    expect(items.map((item) => item.props().id)).toEqual(['2', '3', '1']);
    wrapper.setProps({sort: 'title id:desc'});
    expect(items.map((item) => item.props().id)).toEqual(['3', '2', '1']);
    wrapper.setProps({
      sort: 'title id:desc',
      sortOptions: {descending: true},
    });
    expect(items.map((item) => item.props().id)).toEqual(['1', '3', '2']);
  });

  test('The items are sorted correctly using a string as predicate (useData)', () => {
    const data = [
      {id: '2', title: 'A'},
      {id: '1', title: 'B'},
      {id: '3', title: 'A'},
    ];

    const {wrapper, items} = mount(
      <MuuriComponent>
        {data.map((item) => (
          <ItemUseData key={item.id} id={item.id} title={item.title} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({sort: 'id'});
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
    wrapper.setProps({sort: 'title id'});
    expect(items.map((item) => item.props().id)).toEqual(['2', '3', '1']);
    wrapper.setProps({sort: 'title id:desc'});
    expect(items.map((item) => item.props().id)).toEqual(['3', '2', '1']);
    wrapper.setProps({
      sort: 'title id:desc',
      sortOptions: {descending: true},
    });
    expect(items.map((item) => item.props().id)).toEqual(['1', '3', '2']);
  });

  test('The items are sorted correctly using a function as predicate (propsToData)', () => {
    const data = [{id: '2'}, {id: '1'}, {id: '3'}];

    const {wrapper, items} = mount(
      <MuuriComponent propsToData={({id}) => ({id})}>
        {data.map((item) => (
          <Item key={item.id} id={item.id} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({
      sort: (dataA, dataB) => {
        return parseInt(dataA.id, 10) - parseInt(dataB.id, 10);
      },
    });
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
  });

  test('The items are sorted correctly using a function as predicate (useData)', () => {
    const data = [{id: '2'}, {id: '1'}, {id: '3'}];

    const {wrapper, items} = mount(
      <MuuriComponent>
        {data.map((item) => (
          <ItemUseData key={item.id} id={item.id} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({
      sort: (dataA, dataB) => {
        return parseInt(dataA.id, 10) - parseInt(dataB.id, 10);
      },
    });
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
  });

  test('The items are sorted correctly using an array of keys as predicate', () => {
    const data = [{id: '2'}, {id: '1'}, {id: '3'}];

    const {wrapper, items} = mount(
      <MuuriComponent>
        {data.map((item) => (
          <Item key={item.id} id={item.id} />
        ))}
      </MuuriComponent>
    );

    wrapper.setProps({sort: ['3', '1', '2']});
    expect(items.map((item) => item.props().id)).toEqual(['3', '1', '2']);
  });

  test('Adding an element the sorting is updated', () => {
    const {wrapper, items} = mount(<App />);

    wrapper.setProps({ids: ['3', '2'], sort: 'id'});
    expect(items.map((item) => item.props().id)).toEqual(['2', '3']);
    wrapper.setProps({ids: ['2', '3', '1'], sort: 'id'});
    expect(items.map((item) => item.props().id)).toEqual(['1', '2', '3']);
  });

  test('The Components sorting is separeted from the real sorting', () => {
    const {wrapper, items} = mount(<App ids={['2', '3', '1']} />);

    wrapper.setProps({ids: ['3', '1', '2']});
    expect(items.map((item) => item.props().id)).toEqual(['2', '3', '1']);
    expect(wrapper.find('Item').map((Item) => Item.key())).toEqual([
      '3',
      '1',
      '2',
    ]);
  });

  test('Changing the sorting of components does not affect the real sorting', () => {
    const {wrapper, items} = mount(<App ids={['2', '3', '1']} />);

    expect(wrapper.find('Item').map((Item) => Item.key())).toEqual([
      '2',
      '3',
      '1',
    ]);
    expect(items.map((item) => item.props().id)).toEqual(['2', '3', '1']);
    wrapper.setProps({ids: ['3', '1', '2']});
    expect(wrapper.find('Item').map((Item) => Item.key())).toEqual([
      '3',
      '1',
      '2',
    ]);
    expect(items.map((item) => item.props().id)).toEqual(['2', '3', '1']);
  });
});
