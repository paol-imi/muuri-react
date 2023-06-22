// We need
//  - we want the api to be as simple as possble, and to be headless where possible -> we provide a ref
//  - instance must be ready for children useLayoutEffect -> lazy initialization
//  - the instance lifecycle must be managed inside effects, e.g. it cannot be created inside the ref callback.
//    or will break react constraint (e.g. <StrictMode> -> render,render,mount,unmount,mount -> the ref callback is not called after unmount) -> lazy init function passed to the item
//
// FIXME: WE NEED TO CREATE/DESTROY muuri + ATTACH/DEATTACH muuri getter
//   CODE SHOULD BE READABLE TOP-DOWN!,  be carefull of memory leak
//    The instance is not created at first if no items?
export function useGrid({ ref }) {
  const gridElementRef = ref || useRef<HTMLElement>(null);
  const gridRef = useRef<Grid | null>(null);

  const [, getGrid] = useInstance(() => {
    const grid = new Muuri();

    Element.getGrid = getGrid;
  });

  useLayoutEffect(() => {
    if (gridRef.current) {
      // DYNAMIC OPTIONS:
      //  - dragEnabled
      //  - context
      //  - groupids
      //  - dragAutoScroll??
      //  - dragContainer??
      handleDynamicOptions(gridRef.current, options);
      initGroupLayout(gridRef.current);
    }
  });

  useEffect(() => {
    return () => {
      if (gridRef.current) {
        // free element from muuri instance;
        deattachGrid(gridRef.current._element);
        destroy(gridRef.current);
        // NOTE: NEED to nullify (https://github.com/reactwg/react-18/discussions/18)
        gridRef.current = null;
      }
    };
  }, []);

  return gridElementRef;
}
