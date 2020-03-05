## Reparenting {docsify-ignore}

There are situations were you want to change the MurriComponent `parent` of the dragging item while a drag is occurring. Here's an example in the gif below.

<img src="gifs/grid.gif" style="width: 50%">

### Rules

There are a few simple rules for implementing reparenting.

- The items must have unique `keys` between them, even if they do not share the same MuuriComponent parent.
- When an item changes parent you must sync the state with the `onSend` prop.

```js
<MuuriComponent 
  onSend={(sendData) => {
    // Sync you state...
  }}
/>
```

### Usage

let's try to reproduce a part of the code of the example in gif, we focus on writing the `onSend` function later.

```js
import React, { useState } from 'react'
import { Main, Item } from './components'

const App = () => {
  // Items.
  const [items, setItems] = useState({
    todo: [
      { id: "1", text: "Shopping" }, 
      { id: "3", text: "Housecleaning" }
    ]
    done: [
      { id: "2", text: "Homework" }
    ]
  })

  // Items to children.
  const children = {
    todo: items.todo.maps(item => <Item key={item.id} text={item.text} />),
    done: items.done.maps(item => <Item key={item.id} text={item.text} />)
  }

  return (
    <Main>
      {/* Items marked as 'todo' */}
      <MuuriComponent
        dragEnabled
        id={"TODO"} 
        onSend={/* ... */}
      >
        {children.todo}
      </MuuriComponent>
      {/* Items marked as 'done' */}
      <MuuriComponent
        dragEnabled
        id={"DONE"} 
        onSend={/* ... */}
      >
        {children.done}
      </MuuriComponent>
    </Main>
  )
}
```

When an item is `dragged` to another MuuriComponent as in the gif, we must update the state of the items. Let's create the onSend method for the first MuuriComponent.

```js
<MuuriComponent
  dragEnabled
  id={"TODO"} 
  onSend={({ key }) => {
    // The sended item.
    const sendedItem = items.todo.find(item => item.key === key)
    // The items categories.
    const todo = items.todo.filter(item => item !== sendedItem)
    const done = items.done.concat(sendedItem)

    // Set the state.
    setItems({ todo, done })
  }}
>
```

To keep the code cleaner we can create a function that works for each MuuriComponent and keep it in a different file.

```js
export function useSend(setItems) {
  return useCallback(({ key, fromId, toId }) => {
    // The id of the MuuriComponent that is sending the item.
    fromId = fromId.toLowerCase()
    // The id of the MuuriComponent that is receiving the item.
    toId = toId.toLowerCase()

    // Sync the state with the items.
    setItems(items => {
      // New items object that we can modify.
      const newItems = { ...items }
      // The sended item.
      const sendedItem = items.todo.find(item => item.key === key)

      // Updates the two categories in which the item has been traded-
      newItems[fromId] = newItems[fromId].filter(item => item !== key)
      newItems[toId] = newItems[toId].concat(key)
      
      return newItems
    })
  }, [])
}
```

```js
import { onSend } from './utils'

// ...
  <MuuriComponent
    dragEnabled
    id={"TODO"} 
    onSend={onSend}
  >
// ...
```

### useGrid hook

The `useGrid` hook allow you to know which MuuriComponent the item is a child of. See more [here](hooks/useGrid)

```js
const Item = ({ text }) => {
  const { id } = useGrid()
  // Change the color based on the id.
  const color = (id === "TODO") ? "blue" : "green"

  return (
    <div className={`item color-${color}`}>
      <div className="item-content">
       {text}
      </div>
    </div>
  );
};
```

### Final notes

This package use React fibers to allow reparenting and `keeping that state` of the sended items, no portals are required.