## Muuri {docsify-ignore}

The core of this package is based on [Muuri](https://github.com/haltu/muuri). An instance of Muuri is created internally, and is used to manage all interactions with the DOM.
You can interact with this instance using the [ref](muuricomponent/props?id=ref) prop. <br> For its documentation, see its page on [Github](https://github.com/haltu/muuri).

```js
const App = () => {
  const muuriRef = useRef()

  useEffect(() => {
    // The instance is avaible after the muuri component is mounted
    // as muuriRef.current
  })

  return <MuuriComponent ref={muuriRef} />
}
```

If you just need to initialize some events you can use the onMount prop.

```js
<MuuriComponent 
  onMount={(muuri) => {
    // Drag event.
    muuri.on("drag", () => {
      // Do something...
    })
  }} 
/>
}
```

### Items {docsify-ignore}

Muuri is designed to work with vanilla javascript, items are no longer React components but they are objects to interact with. Using this package these items are `decorated` with two useful methods.

```js
// Return the props of the component 
// that represents the item component in question.
item.getProps()

// Return the data of the component 
// that represents the item component in question.
item.getData()
```