# Muuri-React

> A React friendly API wrapper arround [Muuri](https://github.com/haltu/muuri)

[![NPM](https://img.shields.io/npm/v/muuri-react.svg)](https://www.npmjs.com/package/react-muuri) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Acknowledgements

**([demo](https://codesandbox.io/s/muuri-react-pqtbx) avaible on codesandbox)**

A React `component` is provided with the following features:
- The muuri instance and the grid element are `generated` (on mount) and `destroyed` (on unmount) `automatically`.
- Access to the `muuri` instance using the React [ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) API.
- The `items` are passed as `children`. To add or remove items you can simply re-render the component with different items. The library will take care to add/remove the items from the muuri instance.
    - If you want to see the adding animation remember to set the display property of the item to `none`.
    - When you use a list of components as children it's is critical to add the `key` prop to any component. See the React [docs](https://reactjs.org/docs/lists-and-keys.html).
- Provide `sort`/`filter` props. The grid will be automatically sorted/filtered when the corresponding prop change or an items is added.
    - If you don't provide a primitive value (as an array) you can memoize it to avoid useless sorting/filtering. 
- Provide `onMount`/`onUnmount` props.

## Install

```bash
npm install --save muuri-react
```

## Usage

You can check the codesandbox [demo](https://codesandbox.io/s/muuri-react-pqtbx).
```jsx
import React, { useState, useRef } from 'react'
import { MuuriComponent } from 'muuri-react';

const App = () => {
  // Get the Muuri instance
  const muuriRef = useRef()
  // states
  const [sort, setSort] = useState('By Name')
  const [filter, setFilter] = useState('By Color')
  const [items, setItems] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ])

  // Just add and remove items in the children 
  // without using the muuri method .add & .remove
  const add = (id) => setItems(items.concat({ id })) 
  const remove = (id) => setItems(items.filter(item => item.id !== id))

  // Pass the filter and the sort props.
  // The component will call the .filter() and .sort() method
  // each time the provided values change or an item is added.
  return (
    <MuuriComponent
      sort={sort}
      filter={filter}
      ref={muuriRef}
      onMount={(muuri) => {/* do something... */}}
      onUnmount={(muuri) => {/* do something...*/}}
      options={{
        layoutDuration: 400,
        layoutEasing: "ease",
        dragEnabled: true,
        dragSortInterval: 50,
        dragReleaseDuration: 400,
        dragReleseEasing: "ease"
      }}>
      {items.map(item => 
        (
          <div class="item" key={item.id} style="display: none">
            <div class="item-content">My item</div>
          </div>
        )
      )}
    </MuuriComponent>
  )
}
```

## Props

```jsx
import { MuuriComponent } from 'muuri-react';
```

| Name | Type | Description |
| --- | --- | -- |
| `ref` | `React.Ref` | The ref for the Murri instance. |
| `options` | `object` | The options passed to the muuri instance, the grid element is automatically generated and used internally by the library. Note that the muuri instance is generated only when the component in mounted.  |
| `sort` | `any` | The sort value. The `.sort()` method will be called automatically when this prop change or when an item is added.  |
| `filter` | `any` | The filter value. The `.filter()` method will be called automatically when the this prop change or when an item is added. |
| `sortOptions` | `any` | The sort options used with the sort prop. |
| `filterOptions` | `any` | The filter options used with the filter prop. |
| `onMount` | `function` | If provided this function will be called when the method is `mounted`, the first param passed is the muuri instance. This is a good place to bind the muuri events. |
| `onUnmount` | `function` | If provided this function will be called when the method is `unmounted`, the first param passed is the muuri instance. Note that the instance is automatically destroyed after this method has been called. |

## Limitations

- The the grid element is automatically setted as the drag container to avoid bug if the element re-render while an item is dragging.
- Don't use the add/remove method or set the items in the grid options. The items setted in this way will be removed on the next render.
- This library is made with hooks so a react version > 16.8 is needed.

> ⚠️ The name of this package is **muuri-react** (react-muuri is a different package)

## License

Licensed under [The MIT license](https://github.com/mjtischler/react-muuri/blob/develop/LICENSE.md).
