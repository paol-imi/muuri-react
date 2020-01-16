# Muuri-React

> A React friendly API wrapper around [Muuri](https://github.com/haltu/muuri)

[![NPM](https://img.shields.io/npm/v/muuri-react.svg)](https://www.npmjs.com/package/muuri-react) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Muuri-react** is an un-opinionated wrapper around Muuri built for React.

This package allows the developer to use Muuri with its standard APIs, as if it were implemented with the scheme that React proposes in its [documentation](https://reactjs.org/docs/integrating-with-other-libraries.html).

If the developer prefers a more **React friendly** approach, this package offers several options for interacting with Muuri, from component props to custom hooks.

Each **APIs** that this package offers has been designed to be easy to use and with all the appropriate optimization in terms of performance.

## Table of contents

* [Getting started](#getting-started)
* [MuuriComponent](#muuricomponent)
  * [Usage](#usage)
  * [Props](#Props)
* [Hooks](#hooks)
  * [useRefresh](#userefresh)
* [Limitations](#limitations)
* [License](#license)

## Getting started  

Install via npm. 

```bash
npm install muuri react muuri-react 
```

## MuuriComponent


The MuuriComponent is the component that will manage the muuri instance internally.
You can interact with muuri through the component props and the children, or you can directly access the muuri instance and use its standard methods as if it were outside of react

```jsx
import { MuuriComponent } from 'muuri-react'
```

The `MuuriComponent` has the following features:
- The muuri instance and the grid element are `generated` (on mount) and `destroyed` (on unmount) `automatically`.
- The `muuri` instance can be accessed using the React [Ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) API.
- The `items` can be passed as `children`. To add or remove items you can simply re-render the component with different children. The component will find out the `added`/`removed` items and it will take care to add/remove them from the muuri instance.
    - The `sortData` can be dynamically generated using the props of the children.
    - To see the adding animation set the display property of the item to `none`.
    - When a list of components is used as children it's critical to add the [key](https://reactjs.org/docs/lists-and-keys.html) prop to each component <br> (**DON'T USE THE [INDEX AS KEY](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)**). 
- Sorting and filtering can be managed through the `sort` and `filter` props. The grid will be automatically sorted/filtered when the corresponding prop change or an items is added.
    - If you don't provide a primitive value (e.g. array, function) you can `memoize` it to avoid useless sorting/filtering. 
- `onMount`/`onUnmount` callbacks can be passed as props.


## Usage

**([demo](https://codesandbox.io/s/muuri-react-pqtbx) avaible on codesandbox)**

Here is an example of a simple `muuri-react` implementation.

```jsx
import React, { useState, useRef } from 'react'
import { MuuriComponent } from 'muuri-react';

const App = () => {
  // Sort state
  const [sort, setSort] = useState({ 
    value: 'id', 
    options: { descending: true }
  })
  // Items state
  const [items, setItems] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ])

  // Just add and remove items in the children 
  // without using the muuri methods muuri.add() and muuri.remove().
  const add = (id) => setItems(items.concat({ id })) 
  const remove = (id) => setItems(items.filter(item => item.id !== id))

  // Generate the items on each render.
  // The component will find out the added/removed items and will 
  // take care to add/remove them from the muuri instance.
  // (The use of the key prop is critical)
  const children = items.map(item => <Item key={item.id} id={item.id} />)

  // Pass the filter and the sort props.
  // The component will call the muuri.filter() and muuri.sort() method
  // each time the provided values change or an item is added.
  return (
    <MuuriComponent
      // Muuri.sort(value, options) will be called internally.
      sort={sort.value}
      // The options has to be memoized to avoid useless re-sorting.
      sortOptions={sort.options}
      // The id prop passed to the items is dynamically setted 
      // as sortData, muuri.sort('id') will sort by id.
      propsAsSortData={['id']}
      // Options of the muuri instance.
      // The gridElem is generated internally
      options={{
        layoutDuration: 400,
        dragEnabled: true,
        dragSortInterval: 50,
        dragReleaseDuration: 400
      }}>
      {children}
    </MuuriComponent>
  )
}

// A component that represents an item
const Item = ({ id }) => {
  return (
    // Use 'display: none' to see the adding animation
    <div className="item">
      <div className="item-content">
        { id }
      </div>
    </div>
  )
}
```

The new items will be added in the muuri instance in the same `position` in which they have been added in the children array.

```js
// instead of muuri.add(item, { index })
const addAt = (id, index) => {
  setItems([
    ...items.slice(0, index),
    { id },
    ...items.slice(index)
  ])
}
```

### Standard APIs

It's possible to use the standard muuri APIs, useful if the developer already has a codebase with muuri.

```jsx
import React, { useState, useRef } from 'react'
import { MuuriComponent } from 'muuri-react';

const App = () => {
  // Get the Muuri instance
  const muuriRef = useRef()
  
  useEffect(() => {
    const muuri = muuriRef.current
    // Do something with muuri
  })

  return (<MuuriComponent ref={muuriRef}/>)
}
```

However, if the developer already has a codebase, it is possible to migrate gradually to a more `React friendly` approach, without changing all the code at once.

It is important to note that the items can be generated and removed through the standard methods (muuri.add() and muuri.remove()) or through the children of MuuriComponent, but it is not possible to use both ways (even if it were possible it would be highly discouraged).

## Props

| Name | Type | Description |
| --- | --- | -- |
| `ref` | *`React.Ref`* | The ref for the Muuri instance. |
| `children` | *`React.Children`* | The components that will render the items. Each component **must** render a single item. If an array of components is passed each component **must** have a key. |
| `options` | *`object`* | The options passed to the muuri instance, the grid element is automatically generated and used internally by the library. Note that the muuri instance is generated only when the component is mounted.  |
| `sort` | *`array`* *`function`* *`string`* | The sort value. The `muuri.sort(value)` method will be called automatically when this prop change or when an item is added. If a function is provided it has to be memoized to avoid useless re-sorting. |
| `filter` | *`function`* *`string`* | The filter value. The `muuri.filter(value)` method will be called automatically when this prop change or when an item is added. If no value is provided all items will be visible. If a function is provided it has to be memoized to avoid useless re-filtering. |
| `sortOptions` | *`object`* | The sort options used with the sort prop. This object has to be memoized to avoid useless re-sorting. |
| `filterOptions` | *`object`* | The filter options used with the filter prop. This object has to be memoized to avoid useless re-filtering.|
| `propsAsSortData` | *`array`* | An array of strings where each value represent a prop passed to each child of the MuuriComponent. Each value will be dynamically setted as sortData. (e.g. muuri.sort('propName')) |
| `gridProps` | *`object`* | The custom props of the grid element. |
| `onMount` | *`function`* | If provided this function will be called when the component is `mounted`, the first param passed is the muuri instance. This is a good place to bind the muuri events. |
| `onUnmount` | *`function`* | If provided this function will be called when the component is `unmounted`, the first param passed is the muuri instance. Note that the instance is automatically destroyed after this method has been called. |

## Hooks

A list of hooks that can be used inside a MuurriComponent child.

## useRefresh

UseRefresh is a zero-configuratio hook the manage the cached dimensions of the grid's items and the grid layout. [](https://github.com/haltu/muuri#gridrefreshitems-items-)

```jsx
import { useRefresh } from 'muuri-react'
```

The `useRefresh` hook has the following features:

- The hook has to be used inside a child component of a `MuuriComponent`.
  - The child component has to render an `item`.
  - When the hook is triggered the dimensions and position of the item are `updated`.
  - **muuri.refreshItems([item])** and **muuri.layout()** are called internally.
- An array of `dependencies` can be passed to the hook.
  - The hook will be triggered when a dependencies change (like `useEffect`, that is used internally).
  - In the first render the hook is **not** triggered.
- The hook has `no configuration`, it will take care of finding (without any reference):
  - The MuuriComponent parent.
  - The Muuri instance.
  - The item rendered by the child.
- Performance `optimization`.
  - Just the item to refresh is passed to the **muuri.refershItems([item])** method.
  - When more hooks are triggered together all the requests are collapsed in a single **muuri.layout()** call.
- The triggering of the hook **won't** cause a rerendering.

## Usage

**([demo](https://codesandbox.io/s/muuri-react-nmm2g) with useRefresh avaible on codesandbox)**

The hook can simply be called inside a child of a MuuriComponent with a list of dependencies (like `useEffect`). 

```js
import { useRefresh } from "muuri-react"

// A component that represents an item
const Item = () => {
  const [className, setClassName] = useState("item-large")
  
  // Change the size of the item
  const changeSize = () => {
    if(className === "item-large") setClassName("item-small")
    if(className === "item-small") setClassName("item-large")
  }

  // Equivalent of passing the muuri instance as prop
  // and using a ref for the item
  // 
  // useEffect(() => {
  //   if(!isNotTheFirstRendering()){
  //     muuri.refreshItems(itemRef.current)
  //     muuri.layout() 
  //   }
  // }, [className])
  useRefresh([className])

  return (
    <div className={className}>
      <div className="item-content">
        My item
      </div>
    </div>
  )
}
```
 When one of the `dependencies` change, the hook will take care of finding the MuuriComponent parent and the item rendered by the react component (without the need of passing any reference), then it will `refresh` the size of the item (**muuri.refreshItems(item)**) and `update` the muuri instance (**muuri.layout()**).

### Rerendering from MuuriComponent

If the useRefresh hook is triggered when the `MuuriComponent` parent is `re-rendering` the **muuri.layout()** method is called just one time for performance optimization. 

```js
import { MuuriComponent, useRefresh } from "muuri-react"

const App = () => {
  const [className, setClassName] = useState("item-large")
  
  // The rerendering start from the MuuriComponent 
  // when this method is called
  const changeSize = () => {
    if(className === "item-large") setClassName("item-small")
    if(className === "item-small") setClassName("item-large")
  } 

  // This usage of the hook will cause the following effect
  // with a single .layout() call:
  // 
  // useEffect(() => {
  //   muuri.refreshItems([item1, item2, item3])
  //   muuri.layout()
  // })
  return (
    <MuuriComponent>
      {[1, 2, 3].map(id => <Item key={id} className={className} />)}
    </MuuriComponent>
  )
}

const Item = ({ className }) => {
  useRefresh([className])

  return (
    <div className={className}>
      <div className="item-content">
        My item
      </div>
    </div>
  )
}
```

## Limitations

- The the grid element is automatically setted as the drag container to avoid bug if the component re-render while an item is dragging.
- This library is made with hooks so a react version > 16.8 is needed.

> ⚠️ The name of this package is **muuri-react** (react-muuri is a different package)

## License

Licensed under the [**MIT license**](https://github.com/mjtischler/react-muuri/blob/develop/LICENSE.md).
