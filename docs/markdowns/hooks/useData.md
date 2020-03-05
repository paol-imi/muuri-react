## useData {docsify-ignore}

```js
import { useData } from "muuri-react"
```

The `useData` hook allow you to set the `data` to the item in which the hook has been called. See more [there](usage/items-data).

### Usage

It's possible to directly pass the data as a `parmeter` to the hook, in this way the data will be set on each rendering.

```js
const Item = ({ color, text }) => {
  // Data will have the shape: { color, text }
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

It'a also possible to set the data with the `setData` method returned by the hook.
The two methods can be used together or individually.

```js
const Item = ({ color }) => {
  // Data will have the shape: { color }
  const setData = useData({ color })

  return (
    <div className="item">
      <div className="item-content">
        <input 
          type="text"
          {/* Data will have the shape: { color, text } */} 
          onChange={text => setData({ text }, { merge: true })} />
      </div>
    </div>
  )
}
```
## API

### useData( [data], [options] ) {docsify-ignore}

**Parameters**

* **data** &nbsp;&mdash;&nbsp; *object*
  * The data of the item in which the hook is called.
  * Optional.
* **options.merge** &nbsp;&mdash;&nbsp; *boolean*
  * Should new data be merged with old ones or replace them?
  * Default value: `false`.
  * Optional.

**Returns** &nbsp;&mdash;&nbsp; *setData( data, [options] )*

### setData( data, [options] ) {docsify-ignore}

Function returned by the hook. The identity of the function is guaranteed to be stable so it will be safe to omit them as a dependency (e.g. if it was used inside a useEffect hook).

**Parameters**

* **data** &nbsp;&mdash;&nbsp; *object*
  * The data of the item in which the hook is called.
* **options.merge** &nbsp;&mdash;&nbsp; *boolean*
  * Should new data be merged with old ones or replace them?
  * Default value: `false`.
  * Optional.

### Default options {docsify-ignore}

Default options used by setData, useData.

```js
useData.defaultOptions = { merge: false }
```