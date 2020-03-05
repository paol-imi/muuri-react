## useRefresh {docsify-ignore}
```js
import { useRefresh } from "muuri-react"
```

The `useRefresh` hook allow you to notify the MuuriComponent that the item dimensions are changed, so that it can update the layout.

### Usage

Given this simple style.

```css
/* Small item */
.item-small {
  width: 50px;
  height: 50px;
}

/* Large item */
.item-large {
  width: 100px;
  height: 100px;
}
```

The item in the example below will change its dimensions every time it is clicked.
The useRefresh hook is used with the size value as a `dependency`. Like useEffect, it will activate whenever a dependency changes and it will notify the MuuriComponent to update the layout.

```js
const Item = () => {
  // Size is used as initial state.
  const [size, setSize] = useState('small');
  // Change the size.
  const changeSize = () => {
    if (size === 'large') return 'small'
    if (size === 'small') return 'large'
  };

  // Each time the dependency change the grid size is updated.
  useRefresh([size]);

  return (
    <div className={`item item-${size}`}>
      <div 
        className="item-content"
        onClick={changeSize}
      />
    </div>
  );
};
```

It's also possible to notify the MuuriComponent using the `refresh` method returned by the hook. This method has fewer applications, but has the same effect as the previous one. 

```js
const Item = () => {
  // Size is used as initial state.
  const [size, setSize] = useState('small');
  // Change the size.
  const changeSize = () => {
    if (size === 'large') return 'small'
    if (size === 'small') return 'large'
  };

  // Each time the dependency change the grid size is updated.
  const refresh = useRefresh();

  useEffect(() => {
    refresh()
  }, [size])

  return (
    <div className={`item item-${size}`}>
      <div 
        className="item-content"
        onClick={changeSize}
      />
    </div>
  );
};
```
The item won't re-render after the hook took effect.

## API

### useRefresh( [deps] ) {docsify-ignore}

Show the targeted items.

**Parameters**

* **deps** &nbsp;&mdash;&nbsp; *array*
  * An array of item dependencies, it has the same purpose as in useEffect.
  * Default value: `[]`.
  * Optional.

**Returns** &nbsp;&mdash;&nbsp; *refresh( )*

### refresh( ) {docsify-ignore}

Function returned by the hook. The identity of the function is guaranteed to be stable so it will be safe to omit them as a dependency (e.g. if it was used inside a useEffect hook).

