## Hooks {docsify-ignore}

The custom hooks provided by this package are designed to be used inside the `items`.

### Example

In this example the `useDrag` hook will be used. 

```js
const Item = ({ text }) => {
  // The component will re-render when the item is dragged.
  const isDragging = useDrag()
  
  return (
    <div className="item"}>
      <div className="item-content">
        {isDragging ? "Release me!" : text}
      </div>
    </div>
  )
}
```

### Class components

If you prefer to use class components instead of function components you can still take advantage of hooks. <br>
You can wrap your item using the `withHook` utility.

Let's reproduce the previous example with a class component.

```js
class Item extends React.Component {
  render() {
    const { isDragging } = this.props

    return (
      <div className="item"}>
        <div className="item-content">
          {isDragging ? "Release me!" : text}
        </div>
      </div>
    )
  }
}
```
Now we can wrap the created component and use the wrapped one.

```js
import { withHook } from "muuri-react"
import { Item } from "./components"

const WrappedItem = withHook(Item, ["useDrag"])

const App = () => {
  return (
    <MuuriComponent>
      <WrappedItem key="1" text="I am a wrapped item" />
      <WrappedItem key="2" text="I can use hooks" />
    </MuuriComponent>
  )
}
```

### withHook props

For each hook this utility generate specific `props` and pass them to the item. The following are the nomenclature conventions, to see in depth the APIs of an hook you can check their documentation pages. 

| Hook          | Props         |
| ------------- | ------------- |
| `useData`     | `{ setData }` |
| `useDrag`  | `{ isDragging }` |
| `useGrid`  | `{ id, groupIds, muuri }` |
| `useRefresh`  | `{ refresh }` |
| `useShow`  | `{ isShowing }` |
| `useVisibility`  | `{ setVisibility }` |

