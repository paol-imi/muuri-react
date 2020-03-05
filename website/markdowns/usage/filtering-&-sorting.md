## Filtering & Sorting {docsify-ignore}

Sorting and filtering can be managed via MuuriComponent `props`. <br>
A new filter/sort will be applied when the MuuriComponent `re-rendered` with a new value in the respective prop or an item is added.

### Filtering

The filter prop accept a `function`. The function is executed for every item in the instance, if the return value is truthy the item in question will be `shown` and otherwise `hidden`. The function receives the [data](usage/items-data.md) of the item as it's argument.

#### Usage

In this example we have items that are distinguished by a `text` value assigned to them. We want to take an input string and show only the items whose text contains the given string.

```js
import React, { useState } from "react"
import { MuuriComponent } from "muuri-react"
import { Main, Header, Input, Item } from "./components"

const App = () => { 
  // Text input.
  const [input, setInput] = useState("")

  // State items.
  const [items, setItems] = useState([
    { key: "1", text: "as" },
    { key: "2", text: "gg" },
    { key: "3", text: "st" }
  ])

  // State items to components.
  const children = items.map(item => <Item key={item.key} text={item.text} />)

  // Memoized filter method.
  const filter = useCallback(({ text }) => {
    // Return if the input is contained in the text data.
    return text.indexOf(input) > -1
  }, [input])

  // Render.
  return (
    <Main>
      <Header>
        <Input onChange={setInput} />
      </Header>
      <MuuriComponent
        propsToData={({ text }) => ({ text })}
        filter={filter}
      >
        {children}
      </MuuriComponent>
    </Main>
  )
}
```

We want the filter function to `change` every time the input change so that the MuuriComponent can apply the filter.
We also want the function to `not change` if the input remains the same to avoid unnecessary re-sorting (if the component re-remder for other reasons).

In this example when the input changes, the component re-render (because of setInput), the filter function is recreated (because of useCallback) and the filter is applied correctly.

### Sorting

There are two ways to sort the items. The first is simply by providing a `function` as the comparer, which will receive the [data](usage/items-data) of two items to compare as arguments. It works almost identically to native array sort, the only difference is that the sort is always stable. Alternatively you can sort by the [data](usage/items-data) you have provided for the items. Just provide the data key(s) as a `string` (separated by space) and the items will be sorted based on the provided data keys.

!> The order of the components is separetd from the sorting. The components can be 

#### Usage *(function)*

In this example we have items that are distinguished by an `id`, we want to sort them on that id.

```js
import React, { useState } from "react"
import { MuuriComponent } from "muuri-react"
import { Item } from "./components"

const App = () => {
  // State items.
  const [items, setItems] = useState([
    { key: "1" },
    { key: "2" },
    { key: "3" }
  ])

  // State items to components.
  const children = items.map(item => <Item key={item.key} id={item.key} />)

  // Memoized filter method.
  const sort = useCallback((dataItemA, dataItemB) => {
    const idA = parseInt(dataItemA.id)
    const idB = parseInt(dataItemB.id)

    return idA - idB
  }, [])

  // Render.
  return (
    <MuuriComponent
      propsToData={({ id }) => ({ id })}
      sort={sort}
    >
      {children}
    </MuuriComponent>
  )
}
```
In this example the sorting function never changes, it will be called only in the first rendering or if an element is `added`. <br>
For use with a function the same consideration made with the filter applies.

#### Usage *(string)*

In this example we have items that are distinguished by an id and a `text`, we want to sort them on that text. If 2 items have the same text, they will be sorted by their `id` (in `descending` order).

```js
import React, { useState } from "react"
import { MuuriComponent } from "muuri-react"
import { Item } from "./components"

const App = () => {
  // State items.
  const [items, setItems] = useState([
    { key: "1", text: "as" },
    { key: "2", text: "gg" },
    { key: "3", text: "st" }
  ])

  // State items to components.
  const children = items.map(item => (
    <Item key={item.key} id={item.key} text={item.text}/>
  ))

  // Render.
  return (
    <MuuriComponent
      propsToData={({ id, text }) => ({ id, text })}
      sort={"text id:desc"}
    >
      {children}
    </MuuriComponent>
  )
}
```