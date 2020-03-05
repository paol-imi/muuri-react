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

### Typical use

You will rarely have to interact with muuri, because the MuuriComponent props only cover most use cases. However, there is one use case that can happen more often, it is described in the example below.

**Example**

A common problem is if you want to drag an item with relative dimensions (e.g. `width: 100%`).
When the item is dragged it is attached to the [dragContainer](muuricomponent/props?id=dragContainer) and its size may vary. In the example below the dimensions are fixed before the drag.

```js
<MuuriComponent
  onMount={(muuri) => {
    muuri.on("dragStart", function(item) {
      // Let's set fixed widht/height to the dragged item
      // so that it does not stretch unwillingly when
      // it's appended to the document body for the
      // duration of the drag.
      item.getElement().style.width = item.getWidth() + "px";
      item.getElement().style.height = item.getHeight() + "px";
    })
    
    muuri.on("dragReleaseEnd", function(item) {
      // Let's remove the fixed width/height from the
      // dragged item now that it is back in a grid
      // column and can freely adjust to it's
      // surroundings.
      item.getElement().style.width = "";
      item.getElement().style.height = "";
    })
  }}
/>
    {children}
</MuuriComponent>
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