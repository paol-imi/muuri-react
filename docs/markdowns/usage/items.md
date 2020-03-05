### Add and remove items

To `add` or `remove` elements the MuuriComponent have to be rendered with different children. <br>
As you will see in the example below, it is good practice to store the items data in the component `state`, modifyng this state will allow us to add or remove the items we want.

```js
import React, { useState } from "react"
import { MuuriComponent } from "muuri-react"
import { Main, Header, Button, Item } from "./components"

const App = () => { 
  // State items.
  const [items, setItems] = useState([
    { id: "1" },
    { id: "2" },
    { id: "3" }
  ])

  // State items to components.
  const children = items.map(item => <Item key={item.id} />)

  // The 'setItems' call will re-render the component with different items. 
  const add = (id) => setItems(items.concat({ id })) 
  const remove = (id) => setItems(items.filter(item => item.id !== id))

  // Render.
  return (
    <Main>
      <Header>
        <Button text="Add id" action={add} />
        <Button text="Remove id" action={remove} />
      </Header>
      <MuuriComponent>{children}</MuuriComponent>
    </Main>
  )
  
}
```

It's possible to `both` remove and add items in a single re-render.

### Add in position

The new items will be added in the same `position` in which they have been added in the children array.

```js
// Will insert the new item in the 
// position represented by the index value 
const addAt = (id, index) => {
  setItems([
    ...items.slice(0, index),
    { id },
    ...items.slice(index)
  ])
}
```

### Visibility

An item can be added as `visible` or `hidden` based on the CSS display property which can be block or none. By default all added items are shown, to change this you need to edit the [addOptions](muuricomponent/props?id=addOptions) property.

```js
<MuuriComponent
  addOptions={{ show: false }}
/>
```

!> If the filter is used, it will have priority over choosing to **show**/**hide** items.

### Style features
- It's possible to controle the gaps between the items by giving some `margin` to the item (outer) elements.
- It's possible to see the the `showing animations` when an item is added by setting the CSS display property of the item (outer) element to `none`. See more [here](muuricomponent/props?id=addOptions).