import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount} from '../__shared__/mount';
import {App} from './components';

describe('How reparenting works', () => {
  test('The <item> changes parent', () => {
    const onSend = () => {
      act(() => {
        wrapperA.setProps({ids: []});
        wrapperB.setProps({ids: ['1', '2']});
      });
    };

    const {wrapper: wrapperA, grid: gridA, items} = mount(<App ids={['1']} />);
    const {wrapper: wrapperB, grid: gridB} = mount(
      <App ids={['2']} onSend={onSend} />
    );

    act(() => {
      const item = items.at(0);

      item.simulateDrag();
      gridA.send(0, gridB, 0);
      item.simulateRelease();
    });

    expect(wrapperA.find('.item').length).toBe(0);
    expect(wrapperB.find('.item').length).toBe(2);
  });

  test('The <item> keep its state after reparenting', () => {
    const onSend = () => {
      act(() => {
        wrapperA.setProps({ids: []});
        wrapperB.setProps({ids: ['1', '2']});
      });
    };

    const {wrapper: wrapperA, grid: gridA, items} = mount(<App ids={['1']} />);
    const {wrapper: wrapperB, grid: gridB} = mount(
      <App ids={['2']} onSend={onSend} />
    );

    const stateBeforeSend = wrapperA
      .find('.item')
      .getDOMNode()
      .getAttribute('state');

    act(() => {
      const item = items.at(0);

      item.simulateDrag();
      gridA.send(0, gridB, 0);
      item.simulateRelease();
    });

    const stateAfterSend = wrapperB
      .find('.item')
      .first()
      .getDOMNode()
      .getAttribute('state');

    expect(stateBeforeSend).toBe(stateAfterSend);
  });

  test('The useGrid hook re-render the component with the rigth informations', () => {
    const onSend = () => {
      act(() => {
        wrapperA.setProps({ids: []});
        wrapperB.setProps({ids: ['1', '2']});
      });
    };

    const {wrapper: wrapperA, grid: gridA} = mount(
      <App id="gridA" ids={['1']} />
    );
    const {wrapper: wrapperB, grid: gridB} = mount(
      <App id="gridB" ids={['2']} onSend={onSend} />
    );

    expect(
      wrapperA.find('.item').first().getDOMNode().getAttribute('grid')
    ).toBe('gridA');

    act(() => {
      gridA.send(0, gridB, 0);
    });

    expect(
      wrapperB.find('.item').first().getDOMNode().getAttribute('grid')
    ).toBe('gridB');
  });
});

describe('How manual reparenting works', () => {
  test('The <item> changes parent', () => {
    const {wrapper: wrapperA, grid: gridA} = mount(<App ids={['1']} />);
    const {wrapper: wrapperB, grid: gridB} = mount(<App ids={['2']} />);

    act(() => {
      gridA.send(0, gridB, 0);
      wrapperA.setProps({ids: []});
      wrapperB.setProps({ids: ['1', '2']});
    });

    expect(wrapperA.find('.item').length).toBe(0);
    expect(wrapperB.find('.item').length).toBe(2);
  });

  test('The <item> keep its state after reparenting', () => {
    const {wrapper: wrapperA, grid: gridA} = mount(<App ids={['1']} />);
    const {wrapper: wrapperB, grid: gridB} = mount(<App ids={['2']} />);

    const stateBeforeSend = wrapperA
      .find('.item')
      .getDOMNode()
      .getAttribute('state');

    act(() => {
      gridA.send(0, gridB, 0);
      wrapperA.setProps({ids: []});
      wrapperB.setProps({ids: ['1', '2']});
    });

    const stateAfterSend = wrapperB
      .find('.item')
      .first()
      .getDOMNode()
      .getAttribute('state');

    expect(stateBeforeSend).toBe(stateAfterSend);
  });

  test('The useGrid hook re-render the component with the rigth informations', () => {
    const {wrapper: wrapperA, grid: gridA} = mount(
      <App id="gridA" ids={['1']} />
    );
    const {wrapper: wrapperB, grid: gridB} = mount(
      <App id="gridB" ids={['2']} />
    );

    expect(
      wrapperA.find('.item').first().getDOMNode().getAttribute('grid')
    ).toBe('gridA');

    act(() => {
      gridA.send(0, gridB, 0);
    });

    expect(
      wrapperB.find('.item').first().getDOMNode().getAttribute('grid')
    ).toBe('gridB');
  });
});
