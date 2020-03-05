## useVisibility {docsify-ignore}
```js
import { useVisibility } from "muuri-react"
```

The `useVisibility` hook allow you to notify show/hide the item in which the hook has been called.

### Usage

It's possible to use the `setVisibility` method returned by the hook. It will accept as an argument a boolean representing the visibility of the item.

```js
const Item = () => {
  const setVisibility = useVisibility();

  return (
    <div className="item">
      <div 
        className="item-content"
        {/* Hide the item on click. */}
        onClick={() => setVisibility(false)}
      />
    </div>
  );
};
```

The item won't re-render after the hook took effect, use [useShow](hooks/useShow) for this purpose.

!> The setVisibility method has `no effect` when the component is mounting (basically when the item is added). You have to decide if the item has to be visible or hidden when you [add](usage/items?id=visibility) it.

## API

### useVisibility( ) {docsify-ignore}

Return the visibility setter method.

**Returns** &nbsp;&mdash;&nbsp; *setVisibility( )*

### setVisibility( visibility, [options] ) {docsify-ignore}

Function returned by the hook. The identity of the function is guaranteed to be stable so it will be safe to omit them as a dependency (e.g. if it was used inside a useEffect hook).

**Parameters**

* **visibility** &nbsp;&mdash;&nbsp; *boolean*
  * A truthy value to show the item, a falsy value to hide the item.
* **options.instant** &nbsp;&mdash;&nbsp; *boolean*
  * Should the animation happen instantly?
  * Default value: `false`.
  * Optional.

  
### Default options {docsify-ignore}

Default options used by setVisibility.

```js
useData.defaultOptions = { instant: false }
```