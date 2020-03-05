## Components {docsify-ignore}

In this chapter we analyze the two categories of components with which we interact when working with this library
  - `MuuriComponent` *(Provided by this package)*.
  - `children` of the MuuriComponent  *(You create them)*.


<img src="images/components.png" width="35%">

We refer to the children of the MuuriComponent as `Items` throughout the documentation. <br>
Very few but essential rules to understand how this package works are listed below.


### MuuriComponent

- The MuuriComponent is provided by this `package`.
- The component is responsible for the `layout` management, `sorting`, `filtering` of the items. <br>
- It is possible to interact with 
its functionality through its `props`. 

```js
import { MuuriComponent } from 'muuri-react'
```
```jsx
<MuuriComponent
  filter={filterValue}
  sort={sortValue}
>
  {children}
</MuuriComponent>
```

### Items

- You have to `create` them.
- Each item must have a unique `key` **(do not use [indexes as a key](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))**.

```js
// You create it.
import { Item } from './components'
```
```js
const items = [
  { key: '1' },
  { key: '2' },
  { key: '3' }
]

const children = items.map(item => {
  return <Item key={item.key} />
}
```

### Example

This is one of the [examples](getting-started/examples) avaible on codesandbox.

<img style="border: 1px solid #ddd; width: 50%;" src="images/grid-example-1.png">

The example will have a main component like the one below. 

```js
import React from "react"
import { MuuriComponent } from "muuri-react"
import { Main, Header, Item } from "./components"

const App = () => { 
  // Items.
  const items = [
    { key: "1", text: "zl", size: "s", color: "red" },
    { key: "2", text: "zg", size: "l", color: "blue" },
    { key: "3", text: "nx", size: "l", color: "blue" }
  ]

  // Items to components.
  const children = items.map(item => {
    return (
      <Item 
        key={item.key} 
        text={item.text}
        size={item.size}
        color={item.color}
      />
    )
  }

  // Render.
  return (
    <Main>
      <Header text="Grid demo"/>
      <MuuriComponent>{children}</MuuriComponent>
    </Main>
  )
}
```