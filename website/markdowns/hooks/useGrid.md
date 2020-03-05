## useGrid {docsify-ignore}

```js
import { useGrid } from "muuri-react"
```

The `useGrid` hook allow you to know which MuuriComponent the item is a child of. This hook is useful if you're working with multiple MuuriComponents. See more [here](usage/reparenting).

### Usage

If you are using multiple MuuriComponent you can distinguish them by an id.

```js
const App = () => {
  // Items.
  const todoItems = [<Item key="todo-1" text="Shopping"/>]
  const doneItems = [<Item key="done-1" text="Homework"/>]

  return (
    <Main>
      {/* Items marked as 'todo' */}
      <MuuriComponent id="TODO">
        {todoItems}
      </MuuriComponent>
      {/* Items marked as 'done' */}
      <MuuriComponent id="DONE">
        {doneItems}
      </MuuriComponent>
    </Main>
  )
}
```

Using the useGrid hook you can get the id of the MuuriComponent of which the item is a child.

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
## API

### useGrid( ) {docsify-ignore}

**Returns** &nbsp;&mdash;&nbsp; *GridData*

* **GridData.id** &nbsp;&mdash;&nbsp; *string*
  * The id of the MuuriComponent of which the item is a child.
* **GridData.groupIds** &nbsp;&mdash;&nbsp; *array*
  * The group ids of the MuuriComponent of which the item is a child.
* **GridData.muuri** &nbsp;&mdash;&nbsp; *Muuri*
  * The Muuri instance of the MuuriComponent of which the item is a child.