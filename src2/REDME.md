# OUR GOALS

- DX and HIGH LEVEL ABSTRACTION: there are a lot of low level DND and layout libraries in react (react-dnd...) that are doing an amazing job.
  the goal of this labrary is to abstract every DOM interaction/mechanics with react primitives to let you focus on building AMAZIN UI! :)
- HIGH PERFORMANCE and TINY SIZE:this library is a tiny React wrapper for Murri that focus on performance by minimizing the layout computation,
  Muuri itself compute the layout on worker for performamce. (this new version -70% bundle size from the old one)
- all API are meant to hide the "IMPERATIVNESS" of using Muuri normally. Still the bridge is _very_ tiny, so that the library is more reliant to Muuri updates

# TO FIX FROM OLD VERSION

- TODO: check all code and documentation for spunti!

- TODO: medium + dev post, linked on reddit (layout with reparenting...)

- FIXME: SSR examples

  - 1.  with bundle splitting https://reactjs.org/docs/code-splitting.html#reactlazy
  - 2.  as shown here https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85

- FIXME: OLD problem with scrollbar appearing seems to be related to muuri not refreshing the items on scrollbar hide/show, before layout Items **drag enter -> muuri calc layout (scroll hidden) -> scrollbar appears and items not refreshed -> next layout will fail!** SOLUTION (lazily computed):
  - onLayoutEnd -> save wasScrollbarSHowing
  - onLayoutStart -> check if the scrollbar changed visibility and eventually refresh items

# IMPLEMENTATIONS : 2 MAIN SCENARIOS

- A) THE ITEM CAN BE REPARENTED
- B) THE ITEM CANNOT BE REPARENTED

we will define A) wich is the hardest, then we will see if we can find a unified API or is better to have differences

## COMMON CASES

- responsive layout: under the hood, we will fix the dimension during drag, and restore them after
  - we will laso use the "SIZER" to compute the new size, in case of reparenting during drag
  - The old dynamic style utility will remain.
- SSR: I THINK WE SHOULD NOT SUPPORT SSR (at least in first versin) muuri access window + we use portals (at least in case A))
  - this is a layout library (hydration have little sense, in fcat useLayoutEffect have warning on ssr)

## CASE A)

We start by saying that we need a placeholder to retrieve the position of the item from the dom.
Muuri just append items after drag, messing the positions.

```tsx
 render = (item) => <PLACEHOLDER>{item}</PLACEHOLDER>`
```

The grid will be rendered like:

```tsx
const gridA = useGrid({ onSend });
const gridB = useGrid({ onSend });

return (
  <>
    <div ref={gridA} />
    <div ref={gridB} />
    <Portal>
      {/* same level */}
      {childrenA}
      {childrenB}
    <Portal/>
  </>
);
```

Note that event will not bubble to the DOM tree, but to the REACT TREE. given the nature of Muuri, it should'nt be a problem.
We then wrap PLACEHOLDER.removeChild()

- to not breack on unmount
- to show remove animation

then on each effect, if it has been a change, we

- const items = Array.from(fridEl.children).filter(el => el.getAttribute(data-role) === "placeholder").map(el => el.item)
- muuri.setItemsOrder(items)

## CASE B)

-
- TODO: check of beautyful-dnd address changes of parent element after drag (without reparenting)
- (https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md)
- (https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/changes-while-dragging.md)
-
- We could
- - use the simple approach -> allow the component to return simple jsx (including outer element)
- - we consistent with case A) -> still use render(), with some defaults eventually...
- \*/

## OPEN QUESTIONS

-
- HOW we allow user to define REPARENTING behavior? do we default the gridRef via context? we forse pass one?
-
- HOW TO COLLECT ALL GRIDREFs? use some kind of context?
- \*/

```

```
