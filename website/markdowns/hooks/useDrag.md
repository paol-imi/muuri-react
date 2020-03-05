## useDrag {docsify-ignore}

```js
import { useDrag } from "muuri-react"
```

The `useDrag` hook allow you to know if the item is being dragged. The item will re-render on each drag start/end.

### Usage

Just call it inside an item.

```js
const Item = ({ text }) => {
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

## API

### useDrag( ) {docsify-ignore}

The item will re-render on each drag start/end.

**Returns** &nbsp;&mdash;&nbsp; *boolean*
