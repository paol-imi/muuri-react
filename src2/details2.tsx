//medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import React, { HTMLAttributes, Ref, useRef } from 'react';



function setProperty(node, name, value) {
  if (name === "style") Object.assign(node.style, value);
  else if (name.startsWith("on")) node[name.toLowerCase()] = value;
  else if (name in node) node[name] = value;
  else node.setAttribute(name, value);
}


const App = () => {
  const [{ A, B }, setItems] = useState({ A: [], B: [] });

  const gridRefA = useGrid(gridOptions);
  const gridRefB = useGrid(gridOptions);

  const childrenA = A.map((id) => (
    <Child key={id} grid={ref}>
      {id}
    </Child>
  ));

  const childrenB = B.map((id) => (
    <Child key={id} grid={ref}>
      {id}
    </Child>
  ));

  return (
    <>
      <div id="gridA" ref={gridRefA} />
      <div id="gridB" ref={gridRefB} />
      <ItemsPool>
        {childrenA}
        {childrenB}
      </ItemsPool>
    </>
  );
};

const sizer = document.createElement('div');
const getResponsiveStyle = () => {
  return {};
};

const Item = ({ grid }) => {
  const [render, { isDragging }] = useItem({
    grid,
    isDraggable: true,
    isVisible: true,
  });

  return render(<div>item to drag</div>, {
    style: getResponsiveStyle({ cells: 1 / 5 }),
  });
};

const ItemsPool = ({ children }) => {
  return <div display="none">{children}</div>;
};

const App = () => {
  return <div ref={useGrid(gridOptions)}>{children}</div>;
};

const App = () => {
  return <Grid>{(ref) => <div ref={ref}>{children}</div>}</Grid>;
};

const App = () => {
  const ref = useRef();

  return (
    <Grid $layout={} $elementProps={}>
      {children}
    </Grid>
  );
};

const div: HTMLDivElement = '' as never;
const aa = <div ref></div>;

const a: CSSStyleDeclaration = div.style;

a[''];

div.attributes;

div.class;

export function render(
  jsx,
  {
    ref,
    style,
    ...attributes
  }: {
    ref: Ref<HTMLDivElement>;
    style: CSSStyleDeclaration;
  } & HTMLAttributes<HTMLDivElement>
) {
  const attRef = useRef({});

  const div: HTMLDivElement = '' as never;

  return (
    <div
      ref={(el) => {
        if (el) assign(ref, div);
        else assign(ref, null);

        if (el) {
          Object.assign(div.style, style);
          const oldAttributes = attRef.current

          // set Attribute Like This : https://github.com/facebook/react/blob/cf665c4b73a28b034c8173f4d929205fb12d2d2e/packages/react-dom/src/client/DOMPropertyOperations.js#L152
          if (typeof prevValue === 'function') {
            node.removeEventListener(eventName, prevValue, useCapture);
          }
          if (typeof value === 'function') {
            if (typeof prevValue !== 'function' && prevValue !== null) {
              // If we previously assigned a non-function type into this node, then
              // remove it when switching to event listener mode.
              if (name in (node: any)) {
                (node: any)[name] = null;
              } else if (node.hasAttribute(name)) {
                node.removeAttribute(name);
              }
            }
        
            // $FlowFixMe value can't be casted to EventListener.
            node.addEventListener(eventName, (value: EventListener), useCapture);
            return;
          }

          attRef.current = attributes
        } else {
          // NEED TO REMOVE LISTENRS?
        }}}>
        
        
        </div>
  );
}
