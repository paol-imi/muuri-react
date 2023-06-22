const Item = ({ grid }) => {
  const [render, { isDragging }] = useItem({
    grid,
    isDraggable: true,
    isVisible: true,
  });

  const style = getResponsiveStyle({ cells: 1 / 5 });

  return render(
    <div style={style}>
      <div>item to drag</div>
    </div>
  );
};

const App = () => {
  const [{ itemsA, itemsB }] = useState({ itemsA: [], itemsB: [] });

  const gridA = useGrid();
  const gridB = useGrid();

  return (
    <>
      <div id="gridA" ref={gridA} />
      <div id="gridB" ref={gridB} />
      <>
        {itemsA.map((id) => (
          <Item key={id} grid={gridA} />
        ))}
        {itemsB.map((id) => (
          <Item key={id} grid={gridB} />
        ))}
      </>
    </>
  );
};

const App = () => {
  const [state] = useState([
    { grid: React.createRef(), items: [] },
    { grid: React.createRef(), items: [] },
  ]);

  return state.map(({ grid }) => [
    <Grid grid={grid} />,
    items.map((id) => <Item key={id} grid={grid} />),
  ]);
};

const Grid = ({ gridRef }) => {
  return <div id="gridA" ref={useGrid({ ref: gridRef })} />;
};
