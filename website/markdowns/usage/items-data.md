## Items data {docsify-ignore}

Each item is represented by the `data` you link to it.
The data are a simple objects, the attributes of these objects will be used for `sorting` and `filtering`. These data are only useful if at least one of the two actions is used.

There two ways (and places) in which the items data can be setted.


### MuuriComponent *(props)*

The simplest way to generate the items data is to use the prop of the MuuriComponent called `propsToData`. <br>
The function is executed for each item in the instance. The returned object will represent the data of the item in question. The function receives the props of the item as it's argument.

```js
import React, { useState } from "react"
import { MuuriComponent } from "muuri-react"
import { Main, Header, Item } from "./components"

const App = () => { 
  // State items.
  const [items, setItems] = useState([
    { key: "1", text: "zl", color: "red" },
    { key: "2", text: "zg", color: "blue" },
    { key: "3", text: "nx", color: "blue" }
  ])
  

  // State items to components.
  const children = items.map(item => {
    return (
      <Item 
        key={item.key} 
        text={item.text}
        color={item.color}
      />
    )
  }

  // Render.
  return (
    <MuuriComponent
      propsToData={({ text, color }) => {
        // The first argument represent the props of an item
        // This function will be used to generate data for all the items
        // Generate the data given the props
        const data = { text, color }
        // Return it
        return data
      }}
    >
      {children}
    </MuuriComponent>
  )
}
```

### Item *(hook)*

Another way to generate the data is using the `useData` hook inside the items. See more [here](hooks/useData).

```js
import { useData } from "muuri-react"

// Item component.
const Item = ({ color, text }) => {
  useData({ color, text })

  return (
    <div className={`item color-${color}`}>
      <div className="item-content">
        {text}
      </div>
    </div>
  )
}
```