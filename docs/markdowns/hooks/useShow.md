## useShow {docsify-ignore}

```js
import { useShow } from "muuri-react"
```

The `useShow` hook allow you to know if the item is showing. The item will re-render each time its visibility change.

### Usage

Just call it inside an item.

```js
const Item = ({ text }) => {
  const isShowing = useShow()
  
  return (
    <div className="item"}>
      <div className="item-content" />
    </div>
  )
}
```

!> This hook will return `undefined` on the first render because the DOM element has not been created yet and it is not possible to determine whether it is showing or not. You should know if the item has to be visible or hidden when you [add](usage/items?id=visibility) it.

## API

### useShow( ) {docsify-ignore}

The item will re-render each time its visibility change.

**Returns** &nbsp;&mdash;&nbsp; *boolean*
