import { useGridContext } from "../contexts";

export function useGrid() {
  const { muuri } = useGridContext();

  return {
    id: muuri._component.id,
    groupIds: muuri._component.groupIds,
    muuri
  };
}
