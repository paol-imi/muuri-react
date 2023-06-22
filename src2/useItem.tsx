import { useRef } from 'react';

export function useItem({ isDraggable, show, animateOnRemove }) {
  // We do not support conditional ref passed via props.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef();

  // We need the latest "animateOnRemove" in the destroy function.
  // Cleanup functions are in general NOT events, but here we are detaching the element
  // from the usual React lifecycle, so that we can show a remove animation and
  // THEN remove the element. This specific behavior semantically enter in the
  // events category, not (that much of) an hack :).
  const destroy = useEvent((item, grid) => {
    if (!grid.isDestroyed()) {
      grid.remove(item, { animate: animateOnRemove });
    }
  });

  const [useSnapshot] = useInstance(() => {
    const placeholder = ref.current;
    const element = placeholder.child;
    const grid = getGrid(element);
    const item = grid.add(element, { show });

    //
    disbaleDOMOnRemove(element.parent);

    return [item, destroy];
  });

  const render = useCallback((item) => {
    Children.only(item);

    return <div ref={ref}>{item}</div>;
  }, []);

  const snapshot = useSnapshot(
    (item = { isDragging: () => false }) => ({
      isDragging: item.isDragging(),
    }),
    (item, onChange) => {
      item.onDrag = isDraggable ? onChange : null;

      return () => {
        item.onDrag = null;
      };
    },
    [isDraggable]
  );

  const monitor = {
    isDragging: false,
    isShowing: showOnInit,
  };
  const snapshot = useSnapshot(
    (item = { isDragging: () => false }) => ({
      get isDragging() {
        monitor.isDragging = true;
        return item.isDragging();
      },
    }),
    (item, onChange) => {
      item.onDrag = () => {
        if (monitor.isDragging) {
          item.onDrag = onChange;
        }
      };

      return () => {
        item.onDrag = null;
      };
    },
    [monitor]
  );

  // TODO: automatically regresh items based on DOM dimensions? handle HIDDEN items (display: none) --> default case + èrpvide methods for doing it manually?
  useEffect(() => {
    // FIXME: how to handle sorting????? Muuri RECALC ALL LAYOUT at each change -> no need of any optimization here
    //                                  we could wrap the grid element appendChild and insertBefore mthods -> once called trigger a flag "needResort"
    //                                  // and take the sort from the dom  gridElement.children.map(el -> el.$item)
  });

  return [render, snapshot];
}
